import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    console.log(ctx)
    const user = ctx.auth.user
    if (!user)
      return ctx.response.status(401).send({
        error: "devi essere loggato"
      })

    if (user.role != 'admin')
      return ctx.response.status(403).send({
        error: "non puoi compiere questa azione se non sei un admin"
      })
    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}