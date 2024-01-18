import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TgBotLogDocument = HydratedDocument<TgBotLog>

@Schema({ timestamps: { createdAt: true, updatedAt: false }, collection: 'tg_bot_logs' })
export class TgBotLog {
  @Prop({ isRequired: true })
  tgId: string

  @Prop({ isRequired: true, type: Boolean })
  isBot: boolean

  @Prop({ isRequired: true })
  username: string

  @Prop({ isRequired: true })
  firstName: string

  @Prop({ isRequired: true })
  messageId: string

  @Prop({ isRequired: true })
  chatId: string

  @Prop({ isRequired: true })
  text: string
}

export const TgBotLogSchema = SchemaFactory.createForClass(TgBotLog)
