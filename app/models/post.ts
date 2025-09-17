import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare draft: boolean

  @column()
  declare category: 'public' | 'private' | 'free_to_use'

  // se voglio impostare un nome diverso della colonna lo posso fare con
  // {columnName:'numberOfViews'}
  @column()
  declare numberOfViews: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}