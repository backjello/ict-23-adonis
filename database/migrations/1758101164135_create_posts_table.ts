import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title', 100)
      table.text('description')
      table.boolean('draft').defaultTo(false)
      table.enum('category', ['private', 'public', 'free_to_use']).defaultTo('public')

      // PER STANDARD I NOMI DEI CAMPI SI DEVONO SCRIVERE IN SNAKE CASE
      table.integer('number_of_views').defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}