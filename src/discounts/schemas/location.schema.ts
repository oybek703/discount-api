import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type LocationDocument = HydratedDocument<Location>

@Schema({ timestamps: true })
export class Location {
  @Prop({ isRequired: true })
  latitude: string

  @Prop({ isRequired: true })
  longitude: string
}

export const LocationSchema = SchemaFactory.createForClass(Location)
