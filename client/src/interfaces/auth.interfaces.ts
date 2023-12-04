export interface IRegisterAuth {
  firstName: string
  lastName: string
  username: string
  password: string
}

export interface ILoginAuth extends Omit<IRegisterAuth, 'firstName' | 'lastName'> {}

export interface IUser extends Omit<IRegisterAuth, 'password'> {
  token: string
}
