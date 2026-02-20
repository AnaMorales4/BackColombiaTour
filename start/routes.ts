/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsuariosController = () => import('../app/controllers/usuarios_controller.js')
const ToursController= () => import('../app/controllers/tours_controller.js')
const TiquetesController = () => import('../app/controllers/tiquetes_controller.js')


router.get('/', async () => {
  return {
    hello: 'Ana',
  }
})

router.resource('tours',ToursController)
router.resource('usuarios',UsuariosController)
router.resource('tiquetes',TiquetesController)
router.post('login', [UsuariosController, 'login'])