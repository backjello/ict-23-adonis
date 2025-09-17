import type { HttpContext } from '@adonisjs/core/http';

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    // prendo dai query params 'page' e se non c'è gli assegno 1 come valore di default
    const page = request.input('page', 1)
    const limit = request.input('limit', 25)
    const users = [{ name: 'mario' }, { name: 'luigi' }]
    console.log(page, limit)
    return users
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const name = request.input('name')
    // prendo solo nome e cognome
    const data = request.only(['name', 'surname'])
    // prendo tutto tranne id
    const data2 = request.except(['id'])
    // prendo tutto in assoluto
    const dataAll = request.all()

    /**
     * Codice per la creazione dell'utente
     * ...
     */

    return data

  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    console.log('questa è la rotta show')
    const id = params.id
    console.log("id cercato " + id)
    return {
      name: "mario",
      lastName: "rossi"
    }
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const id = params.id
    const data = request.only(['name', 'surname'])

    /**
     * Recuperiamo l'utente da DB e lo aggiorniamo
     */

    return {
      id,
      ...data
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const id = params.id
    console.log('cancello l\'utente con ID ' + id)
  }

}