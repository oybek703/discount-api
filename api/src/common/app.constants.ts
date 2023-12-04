export enum EnvVariablesKeys {
  port = 'PORT',
  jwtSecret = 'JWT_SECRET',
  dbURI = 'DB_URI'
}

export enum DbLogType {
  error = 'error',
  success = 'success'
}

export enum COMMON_ERRORS {
  userNameExists = 'Username already exists.',
  userDoesNotExist = 'User does not exist.'
}
