export interface User {
  id: string | number
  name: string
  birthday: Date
  city: string
  /**
   * state abbreviation
   */
  state: string
  zipCode: string
}
