import { Message, User as TgUser } from 'telegraf/typings/core/types/typegram'

export class TgBotLogDto {
  from: TgUser
  message: Message
}
