/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// registriamo una rotta con metodo get e path 'ciao' (di conseguenza l'endpoint sarà 'http://localhost:3333/ciao')
router.get('ciao', () => {
  return {
    saluto: 'ciao'
  }
})

// creaimo una rotta con un ID come parametro
// router.get('/user/:id', ({ params }) => {
//   const id = params.id
//   return {
//     id,
//     name: 'mario',
//     age: 25
//   }
// })


// le 5 righe sopra possono essere riassunte così:
// router.resource('/users', '#controllers/users_controller')

router.group(() => {
  // rotta show
  router.get('/users/:id', '#controllers/users_controller.show')
  // rotta index
  router.get('/users', '#controllers/users_controller.index')
  // rotta store
  router.post('/users', '#controllers/users_controller.store')
  // rotte update
  router.put('/users/:id', '#controllers/users_controller.update')
  // rotta delete
  router.delete('/users/:id', '#controllers/users_controller.destroy')
  router.resource('posts', '#controllers/posts_controller')

  router.resource('comments', '#controllers/comments_controller').apiOnly().except(['index'])

  // questa rotta sarà accessibile solo se sono admin
  router.get('comments', '#controllers/comments_controller.index').use(middleware.admin())

  router.get('me', '#controllers/auth_controller.me')

}).use(middleware.auth())
// .prefix('v1')


// rotte auth
router.post('register', '#controllers/auth_controller.register')
router.post('login', '#controllers/auth_controller.login')
router.post('login-google', '#controllers/auth_controller.loginGoogle')
router.get('/verify-email/:verifyString', '#controllers/auth_controller.verifyEmail')

// rotta per la battaglia navale con due parametri (entrambi obbligatori)
router.get('/battaglia-navale/:row/:col', ({ params }) => {
  const col = params.col
  const row = params.row
  return `la cella colpita è la ${row} - ${col}`
})

// rotta con parametri opzionali (accettiamo rotte con o senza :id (quindi /post e /post/456))
router.get('post/:id?', ({ params }) => {
  const id = params.id
  if (id) {
    return "prendo solo il post " + id
  }
  else {
    return "prendo tutti i post (non ho id)"
  }
})

router.get('comment/:id', ({ params }) => {
  const id = params.id
  return {
    id
  }
}).where('id', /^[0-9]+$/)