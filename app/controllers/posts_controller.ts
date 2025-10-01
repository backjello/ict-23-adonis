import { deleteOrUpdatePost } from '#abilities/main'
import Post from '#models/post'
import { createPostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {

    const page = request.input('page', 1)
    const userId = request.input('user-id')
    const postQuery = Post.query()
      .preload('comments', q => q.preload('user'))
      .preload('user')

    if (userId)
      postQuery.where('userId', userId)

    return await postQuery.paginate(page, 25)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    // all'interno di auth.user ho i dati dell'utente autenticato
    // (in automatico se la rotta è protta da auth_middleware)
    const user = auth.user!
    const userId = user.id
    // solo per test
    // const data = request.all()
    // imposto che lo user id è quello dell'utente loggato
    // data.userId = userId

    // if (!data.title || data.title.length > 255) // a titolo di esempio
    //   return response.badRequest("devi passarmi il titolo")

    const data = await request.validateUsing(createPostValidator)

    // da non fare, servirebbe validazione input
    const newPost = await Post.create({
      ...data,
      userId: user.id
    })

    return response.created(newPost)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id

    const post = await Post.findOrFail(id)

    await post.load('comments')

    return post
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, bouncer, response }: HttpContext) {
    const id = params.id

    const post = await Post.findOrFail(id)

    if (await bouncer.denies(deleteOrUpdatePost, post))
      return response.forbidden({
        error: "non puoi aggiornare il post"
      })

    const data = request.all()

    // sovrascrivo i dati di post con quelli di data
    post.merge(data)

    // salvo i dati del DB (per ora erano solo in memoria volatile)
    await post.save()

    return post

  }

  /**
   * Delete record
   */
  async destroy({ params, auth, response, bouncer }: HttpContext) {
    const id = params.id
    const user = auth.user!
    const post = await Post.findOrFail(id)

    // if (post.userId != user.id || user.role != 'admin') {
    //   return response.forbidden({
    //     error: "non puoi cancellare un post che non sia il tuo"
    //   })
    // }
    if (await bouncer.allows(deleteOrUpdatePost, post))
      await post.delete()

    else
      return response.forbidden({
        error: "devi essere un admin o il post deve essere tuo"
      })

  }
}