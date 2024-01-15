import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Message, User as TgBotUser } from 'telegraf/typings/core/types/typegram'

export type TgBotLogDocument = HydratedDocument<TgBotLog>

@Schema({ timestamps: { createdAt: true }, collection: 'tg_bot_logs' })
export class TgBotLog {
  @Prop({ isRequired: true, type: Object })
  from: TgBotUser

  @Prop({ isRequired: true, type: Object })
  message: Message
}

export const TgBotLogSchema = SchemaFactory.createForClass(TgBotLog)
