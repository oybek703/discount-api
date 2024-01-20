import { InjectBot, TELEGRAF_STAGE } from 'nestjs-telegraf'
import { LanguageTexts, SceneIds } from '../../common/app.constants'
import { BotContext } from '../../interfaces/tg-bot.interfaces'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { Composer, Scenes, Telegraf } from 'telegraf'
import { TgBotService } from '../tg-bot.service'
import { message } from 'telegraf/filters'
import { mainMenuKeyboard, sendLocationKeyboard } from '../keyboards'
import { DiscountsService } from '../../discounts/discounts.service'
import { DiscountStatus } from '../../interfaces/discount.interfaces'

@Injectable()
export class AddDiscountWizard {
  private readonly logger = new Logger(AddDiscountWizard.name)
  readonly scene: Scenes.WizardScene<BotContext>
  readonly steps: Composer<BotContext>[] = []

  constructor(
    @InjectBot() bot: Telegraf<BotContext>,
    @Inject(TELEGRAF_STAGE) private readonly stage: Scenes.Stage<BotContext>,
    private readonly tgBotService: TgBotService,
    private readonly discountsService: DiscountsService
  ) {
    // Create scene and add steps
    this.steps = [this.step1(), this.step2(), this.step3(), this.step4(), this.step5()]
    this.scene = new Scenes.WizardScene<BotContext>(SceneIds.addDiscount, ...this.steps)
    // Register add discount wizard
    this.stage.register(this.scene)
    bot.use(stage.middleware())
    bot.catch((err: Error, ctx) => this.tgBotService.catchException(err, ctx, this.logger))
  }

  // STEP - 1 Ask brief title
  step1() {
    return this.tgBotService.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountTitle))
        if (!ctx.scene.session.discount)
          ctx.scene.session.discount = { ...ctx.scene.session.discount }
        return ctx.wizard.next()
      })
    })
  }

  // STEP - 2 Get title and ask detailed description
  step2() {
    return this.tgBotService.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        ctx.scene.session.discount.title = ctx.update?.message.text
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountDescription))
        ctx.wizard.next()
      })
    })
  }

  // STEP - 3 Get description and ask pictures
  step3() {
    return this.tgBotService.createComposer(composer => {
      composer.on(message('text'), async ctx => {
        ctx.scene.session.discount.description = ctx.update?.message.text
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountPicture))
        ctx.wizard.next()
      })
    })
  }

  // STEP - 4 Get pictures and ask location
  step4() {
    const map = new Map()
    return this.tgBotService.createComposer(composer => {
      composer.use(async (ctx, next) => {
        const { message } = ctx
        if (message) {
          // Middleware for grouped image files
          if ('media_group_id' in message) {
            if (!map.get(ctx.chat.id)) {
              map.set(ctx.chat.id, new Map())
            }
            const userMap = map.get(ctx.chat.id)
            if (!userMap.get(message.media_group_id)) {
              userMap.set(message.media_group_id, {
                resolve: () => {},
                messages: []
              })
            }
            const mediaGroupOptions = userMap.get(message.media_group_id)

            mediaGroupOptions.resolve(false)
            mediaGroupOptions.messages.push(message)
            return new Promise(resolve => {
              mediaGroupOptions.resolve = resolve
              setTimeout(() => resolve(true), 100)
            }).then(value => {
              if (value === true) {
                ctx.mediaGroup = mediaGroupOptions.messages
                  .slice()
                  .sort((a, b) => a.message_id - b.message_id)
                userMap.delete(message.media_group_id)
                if (userMap.size === 0) {
                  map.delete(ctx.chat.id)
                }
                return next()
              }
            })
          }
        }
        return next()
      })
      // For grouped images
      composer.on(message('media_group_id'), async ctx => {
        const imageLinks = []
        const { message_id } = await ctx.reply(ctx.i18n.t(LanguageTexts.pleaseWait))
        for (const message of ctx.mediaGroup) {
          const file_id =
            //@ts-ignore
            'photo' in message ? message.photo.pop().file_id : message.document.file_id
          const fileLink = await this.tgBotService.saveFileAndGetLink(ctx, file_id)
          imageLinks.push(fileLink)
        }
        await ctx.deleteMessage(message_id)
        ctx.scene.session.discount.images = imageLinks
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountLocation), sendLocationKeyboard(ctx))
        ctx.wizard.next()
      })
      // For single image file
      composer.on([message('photo'), message('document')], async ctx => {
        const file_id =
          //@ts-ignore
          'photo' in ctx.message ? ctx.message.photo.pop().file_id : ctx.message.document.file_id
        const fileLink = await this.tgBotService.saveFileAndGetLink(ctx, file_id)
        ctx.scene.session.discount.images = [fileLink]
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountLocation), sendLocationKeyboard(ctx))
        ctx.wizard.next()
      })
    })
  }

  // STEP - 5 Get location, save discount
  step5() {
    return this.tgBotService.createComposer(composer => {
      composer.on(message('location'), async ctx => {
        const { longitude, latitude } = ctx.update.message?.location
        await this.discountsService.upsertDiscount({
          ...ctx.scene.session.discount,
          location: { latitude: String(latitude), longitude: String(longitude) },
          status: DiscountStatus.WAITING_CHECKING,
          tgUserId: String(ctx.from.id)
        })
        await ctx.reply(ctx.i18n.t(LanguageTexts.discountSaveText), mainMenuKeyboard(ctx))
        await ctx.scene.leave()
      })
    })
  }
}
