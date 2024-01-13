import { config } from 'dotenv'

export const envFilePath = `${process.cwd()}/.${process.env.NODE_ENV || 'production'}.env`

config({ path: envFilePath })
