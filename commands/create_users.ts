import { PostFactory } from '#database/factories/post_factory'
import { args, BaseCommand, flags } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class CreateUsers extends BaseCommand {
  static commandName = 'create:posts'
  static description = 'comando usato per creare X utenti random nel DB'

  static options: CommandOptions = {
    startApp: true,
  }

  // @args.string({
  //   required: true,
  //   argumentName: 'number',
  //   default: '10',
  //   description: 'Specifica il numero di utenti da creare',
  //   name: 'numero di utenti',
  // })
  @flags.number({
    name: 'numero',
    alias: 'n',
    description: 'Specifica il numero di utenti da creare',
    default: 1,
    flagName: 'numero',
    required: true,
  })
  declare numberOfUserToCreate: number

  async run() {
    await PostFactory.createMany(this.numberOfUserToCreate)
  }
}