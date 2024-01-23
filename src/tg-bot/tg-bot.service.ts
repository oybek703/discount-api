import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from './schemas/tg-user.schema'
import { Model } from 'mongoose'
import { randomUUID } from 'crypto'
import { join } from 'path'
import { unlink, writeFile } from 'fs/promises'
import { EnvVariablesKeys, LanguageTexts } from '../common/app.constants'
import { ConfigService } from '@nestjs/config'
import { getFileMimeType, isValidImageFile } from '../common/utils'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { Composer } from 'telegraf'
import { TgBotLogDto } from '../db-logger/dtos/tg-bot-log.dto'
import { DbLoggerService } from '../db-logger/db-logger.service'

@Injectable()
export class TgBotService {
  constructor(
    @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>,
    private readonly configService: ConfigService,
    private readonly dbLoggerService: DbLoggerService
  ) {}

  async findTgUserByPhoneOrId(tgId: number, phoneNumber: string): Promise<TgUserDocument | null> {
    return this.tgUserModel
      .findOne({
        $or: [{ tgUserId: tgId }, { phoneNumber }]
      })
      .exec()
  }

  async downloadAndSaveLocalFile(filePath: string) {
    const botToken = this.configService.get(EnvVariablesKeys.tgBotToken)
    const fileURL = `https://api.telegram.org/file/bot${botToken}/${filePath}`
    const fileMimeType = getFileMimeType(filePath)
    const fileName = `${randomUUID()}.${fileMimeType}`
    const relativeFilePath = join('media/images', fileName)
    const absoluteFilePath = join(process.cwd(), relativeFilePath)
    try {
      const response = await fetch(fileURL)
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      await writeFile(absoluteFilePath, buffer)
      return { localFilePath: relativeFilePath, fileName }
    } catch (e) {
      await unlink(absoluteFilePath)
      throw new Error('Error while saving image file.')
    }
  }

  async catchException(exception: Error, ctx: BotContext, logger?: Logger) {
    if (exception instanceof Error) {
      logger?.error(`${exception.message} \n ${exception.stack}`)
    }
    await ctx.reply(ctx.i18n.t(LanguageTexts.tryLater))
  }

  async insertTgLogToDb({ message }: BotContext) {
    if (message) {
      const tgBotLogDto: TgBotLogDto = {
        chatId: String(message.chat.id),
        isBot: message.from.is_bot,
        tgId: String(message.from.id),
        firstName: message.from.first_name,
        username: message.from.username,
        messageId: String(message.message_id),
        // @ts-ignore
        text: message.text
      }
      await this.dbLoggerService.insertTgLogToDb(tgBotLogDto)
    }
  }

  async saveFileAndGetLink(ctx: BotContext, fileId: string) {
    const mediaHost = this.configService.get(EnvVariablesKeys.mediaHost)
    const { file_path } = await ctx.telegram.getFile(fileId)
    const fileMimeType = getFileMimeType(file_path)
    if (isValidImageFile(fileMimeType)) {
      const { localFilePath } = await this.downloadAndSaveLocalFile(file_path)
      return `${mediaHost}/${localFilePath}`
    }
  }

  createComposer(handler: (composer: Composer<BotContext>) => void) {
    const composer = new Composer<BotContext>()
    composer.use(async (ctx, next) => {
      await this.insertTgLogToDb(ctx)
      return next()
    })
    composer.start(ctx => ctx.scene.leave())
    handler(composer)
    return composer
  }
}
