import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'verification_codes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('code', 6)
      table.string('token', 64)

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.timestamp('created_at')

      table.unique(['code'])
      table.unique(['token'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}