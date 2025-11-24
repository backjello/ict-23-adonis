import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod/v3'

export default class Testopenai extends BaseCommand {
  static commandName = 'testopenai'
  static description = ''

  static options: CommandOptions = {}

  async run() {

    const client = new OpenAI({
      apiKey: env.get('OPEN_AI_KEY')
    })

    const taskSchema = z.object({
      tasks: z.array(
        z.object({
          title: z.string().describe('Titolo della task').min(10).max(30),
          description: z.string().describe('Descirzione il più possibile dettagliata della task')
            .min(30).max(250),
          priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).describe('priorità della task'),
          dueDate: z.string().date('formato AAAA-MM-GG').nullable().describe('se indicata, è la data di scadenza')
        }))
    })

    const res = await client.chat.completions.parse({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Sei un sistema per trasformare i ticket in tasks atomiche. Crea un array di task.'
        },
        {
          role: 'user',
          content: `Non riesco ad effettura il login. Inoltre mi sono sparite alcune email. 
          Devo necessariamente mandare una email entro il 05/12/25`
        },
      ],
      response_format: zodResponseFormat(taskSchema, 'task')
    })
    console.log(res.choices[0].message)


    // const res = await client.chat.completions.create({
    //   messages: [{
    //     role: 'user',
    //     content: 'raccontami una barzelletta'
    //   }],
    //   model: 'gpt-4o-mini'
    // })

    // console.log(res.choices[0].message)


    // const res = await client.chat.completions.create({
    //   model: 'gpt-4o-mini',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: 'Sei un sistema per trasformare i ticket in tasks atomiche. Crea un array di task definendo priorità, titolo, e descrizione'
    //     },
    //     {
    //       role: 'user',
    //       content: 'Non riesco ad effettura il login. Inoltre mi sono sparite alcune email'
    //     }
    //   ]
    // })
    // console.log(res.choices[0].message)

  }
}