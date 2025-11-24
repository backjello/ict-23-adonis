import env from '#start/env';
import type { HttpContext } from '@adonisjs/core/http';
import OpenAI from 'openai';

export default class ChatsController {

    client = new OpenAI({
        apiKey: env.get('OPEN_AI_KEY')
    })

    async complete({ request }: HttpContext) {
        const res = await this.client.chat.completions.create({
            messages: [{
                role: 'user',
                content: request.input('text')
            }],
            model: 'gpt-4o-mini'
        })

        const response = res.choices[0].message
        console.log(response)

        return { response: response.content }

    }
}