export enum DiscountStatus {
  OPEN = 'OPEN',
  WAITING_CHECKING = 'WAITING_CHECKING',
  CHECKED = 'CHECKED',
  CLOSED = 'CLOSED'
}

export class ILocation {
  latitude: string
  longitude: string
}
