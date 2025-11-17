import User from '#models/user';
import type { HttpContext } from '@adonisjs/core/http';
import { OAuth2Client } from 'google-auth-library';

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

  async loginGoogle({ ally, request }: HttpContext) {

    const token = request.input('token')
    const googleClient = new OAuth2Client()

    const ticket = await googleClient.verifyIdToken({
      idToken: token.credential
    })

    const userData = ticket.getPayload()

    const email = userData?.email

    // cerco se l'utente è presente nel sistema
    let user = await User.findBy('email', email)

    if (!user) { // non ho trovato l'utente, siamo quindi in register, lo creo
      user = await User.create({
        email: userData?.email,
        fullName: userData?.given_name + " " + userData?.family_name,
        password: crypto.randomUUID() // password random, meglio se più lunga e sicura ma per test va bene
      })
    }
    // ! in linea teorica andrebbe controllato che la mail sia verificata

    // creo il token e lo passo a FE
    const accessToken = await User.accessTokens.create(user)

    return { user, accessToken }

  }

  async me({ auth }: HttpContext) {
    return auth.user
  }

}
