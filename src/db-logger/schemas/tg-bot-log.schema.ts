import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TgBotLogDocument = HydratedDocument<TgBotLog>

@Schema({ timestamps: { createdAt: true } })
export class TgBotLog {
  @Prop({ isRequired: true })
  ip_address: string
}

export const TgBotLogSchema = SchemaFactory.createForClass(TgBotLog)
