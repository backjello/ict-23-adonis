import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';

export default class AuthController {

    async register({ request }: HttpContext) {
        const data = request.all()
        const user = await User.create(data)
        // si può mandare una mail di conferma per verificare che la mail si dell'utente
        return user
    }

    async login({ request }: HttpContext) {
        const email = request.input('email')
        const password = request.input('password')

        const user = await User.verifyCredentials(email, password)

        const token = await User.accessTokens.create(user)

        return {
            user,
            token
        }
    }

    async me({ auth }: HttpContext) {
        return auth.user
    }

}