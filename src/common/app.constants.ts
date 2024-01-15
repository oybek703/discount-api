export enum EnvVariablesKeys {
  port = 'PORT',
  jwtSecret = 'JWT_SECRET',
  dbURI = 'DB_URI',
  tgBotToken = 'TG_BOT_TOKEN',
  redisHost = 'REDIS_HOST',
  redisPort = 'REDIS_PORT'
}

export enum DbLogType {
  error = 'error',
  success = 'success'
}

export enum COMMON_ERRORS {
  userNameExists = 'Username already exists.',
  userDoesNotExist = 'User does not exist.'
}

export enum I18nLanguages {
  ru = 'ru',
  en = 'en',
  uz = 'uz'
}

export enum LanguageTexts {
  chooseLanguage = 'chooseLanguage',
  tryLater = 'tryLater',
  ruLang = 'Русский',
  uzLang = "O'zbekcha",
  enLang = 'English',
  sendPhoneNumber = 'sendPhoneNumber',
  introduceYourself = 'introduceYourself',
  enterFullName = 'enterFullName',
  badUsernameError = 'badUsernameError',
  startChat = 'startChat',
  connectOperator = 'connectOperator',
  waitingOperator = 'waitingOperator',
  waitOperatorToJoin = 'waitOperatorToJoin',
  operatorsBusyError = 'operatorsBusyError',
  chatEndedError = 'chatEndedError',
  operatorJoined = 'operatorJoined',
  pleaseWait = 'pleaseWait',
  endChat = 'endChat',
  tooManyRequests = 'tooManyRequests'
}

export enum SceneIds {
  getUserInfo = 'get-user-info',
  chatWithUser = 'chat-with-user'
}

export const phoneNumberReg = /^\d{9}$/
export const foulWordsRegex =
  /\w{0,5}[хx]([хx\s\!@#\$%\^&*+-\|\/]{0,6})[уy]([уy\s\!@#\$%\^&*+-\|\/]{0,6})[ёiлeеюийя]\w{0,7}|\w{0,6}[пp]([пp\s\!@#\$%\^&*+-\|\/]{0,6})[iие]([iие\s\!@#\$%\^&*+-\|\/]{0,6})[3зс]([3зс\s\!@#\$%\^&*+-\|\/]{0,6})[дd]\w{0,10}|[сcs][уy]([уy\!@#\$%\^&*+-\|\/]{0,6})[4чkк]\w{1,3}|\w{0,4}[bб]([bб\s\!@#\$%\^&*+-\|\/]{0,6})[lл]([lл\s\!@#\$%\^&*+-\|\/]{0,6})[yя]\w{0,10}|\w{0,8}[её][bб][лске@eыиаa][наи@йвл]\w{0,8}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[uу]([uу\s\!@#\$%\^&*+-\|\/]{0,6})[н4ч]\w{0,4}|\w{0,4}[еeё]([еeё\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[нn]([нn\s\!@#\$%\^&*+-\|\/]{0,6})[уy]\w{0,4}|\w{0,4}[еe]([еe\s\!@#\$%\^&*+-\|\/]{0,6})[бb]([бb\s\!@#\$%\^&*+-\|\/]{0,6})[оoаa@]([оoаa@\s\!@#\$%\^&*+-\|\/]{0,6})[тnнt]\w{0,4}|\w{0,10}[ё]([ё\!@#\$%\^&*+-\|\/]{0,6})[б]\w{0,6}|\w{0,4}[pп]([pп\s\!@#\$%\^&*+-\|\/]{0,6})[иeеi]([иeеi\s\!@#\$%\^&*+-\|\/]{0,6})[дd]([дd\s\!@#\$%\^&*+-\|\/]{0,6})[oоаa@еeиi]([oоаa@еeиi\s\!@#\$%\^&*+-\|\/]{0,6})[рr]\w{0,12}|\w{0,6}[cсs][уu][kк][aа]/gim

export const sessionPrefix = 'telegram-bot/session/'
export const userErrorsPrefix = 'telegram-bot/errors'
