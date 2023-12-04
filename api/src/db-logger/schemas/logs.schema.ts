import { DbLogType } from '../../common/app.constants'
import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type LogDocument = HydratedDocument<Log>

@Schema({ timestamps: { createdAt: true } })
export class Log {
  @Prop({ enum: Object.keys(DbLogType) })
  log_type: DbLogType

  @Prop({ isRequired: true })
  ip_address: string

  @Prop({ isRequired: true })
  status_code: string

  @Prop({ isRequired: true })
  method: string

  @Prop({ isRequired: true })
  route: string

  @Prop()
  error_message: string

  @Prop({ isRequired: true })
  response_time: number
}

export const LogSchema = SchemaFactory.createForClass(Log)
