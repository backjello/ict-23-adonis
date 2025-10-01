import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Comment from './comment.js'
import User from './user.js'

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

  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  // se voglio impostare un nome diverso della colonna lo posso fare con
  // {columnName:'numberOfViews'}
  @column()
  declare numberOfViews: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}