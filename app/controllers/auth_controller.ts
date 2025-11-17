import User from '#models/user';
import VerificationCode from '#models/verification_code';
import env from '#start/env';
import type { HttpContext } from '@adonisjs/core/http';
import mail from '@adonisjs/mail/services/main';
import { OAuth2Client } from 'google-auth-library';

export default class AuthController {

  async register({ request }: HttpContext) {
    const data = request.all()
    const user = await User.create(data)
    // si può mandare una mail di conferma per verificare che la mail sia dell'utente
    await this.sendVerificationCode(user.email)
    return user
  }

  async sendVerificationCode(email: string) {
    const code = await VerificationCode.create({
      // a titolo di esempio, le creazioni andrebbero fatte con funzioni migliori
      code: new Date().getTime().toString().slice(-6),
      token: crypto.randomUUID()
    })
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

    await mail.send((msg) => {
      msg
        .from(env.get('SMTP_USER'))
        .to(user.email)
        .subject('Login con google')
        .html(`
          Ciao <b>${user.fullName}</b>, <br>
          Hai appena effettuato il login con google nella nostra app. <br>
          Non sei stato tu? <a href="help">Contattaci subito</a> <br><br>

          Grazie<br>
          NOME_APP
          `)
    })

    return { user, accessToken }

  }

  async me({ auth }: HttpContext) {
    return auth.user
  }

}
