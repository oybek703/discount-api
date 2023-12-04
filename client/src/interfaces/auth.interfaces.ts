export interface IRegisterAuth {
  firstName: string
  lastName: string
  username: string
  password: string
}

export interface ILoginAuth extends Omit<IRegisterAuth, 'firstName' | 'lastName'> {}
