import Comment from '#models/comment';
import type { HttpContext } from '@adonisjs/core/http';

export default class CommentsController {


    async index() {
        const comments = await Comment.query()
            .preload('post')

        return comments
    }

    async show({ params }: HttpContext) {
        const id = params.id
        const comment = await Comment.findOrFail(id)
        await comment.load('post')
        return comment
    }

    async store({ request }: HttpContext) {

        const data = request.all()

        return await Comment.create(data)

    }

}