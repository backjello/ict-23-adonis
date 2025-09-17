import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {

    const page = request.input('page', 1)
    const posts = await Post.query()
      .paginate(page, 25)

    return posts
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    // solo per test
    const data = request.all()

    if (!data.title) // a titolo di esempio
      return response.badRequest("devi passarmi il titolo")

    // da non fare, servirebbe validazione input
    const newPost = await Post.create(data)

    return response.created(newPost)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const id = params.id

    const post = await Post.findOrFail(id)

    return post
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const id = params.id

    const post = await Post.findOrFail(id)

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
  async destroy({ params }: HttpContext) {
    const id = params.id

    const post = await Post.findOrFail(id)

    await post.delete()

  }
}