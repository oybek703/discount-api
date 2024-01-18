import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from './schemas/tg-user.schema'
import { Model } from 'mongoose'

@Injectable()
export class TgBotService {
  constructor(@InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>) {}

  async findTgUserByPhoneOrId(tgId: number, phoneNumber: string): Promise<TgUserDocument | null> {
    return this.tgUserModel
      .findOne({
        $or: [{ tgUserId: tgId }, { phoneNumber }]
      })
      .exec()
  }
}
