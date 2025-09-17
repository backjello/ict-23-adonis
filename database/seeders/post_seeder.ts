import Post from '#models/post'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Post.createMany([
      {
        title: 'foto del gatto',
        description: 'guarda il mio gatto',
      },
      {
        title: 'foto del cane',
        description: 'guarda il mio cane'
      }
    ])

  }
}