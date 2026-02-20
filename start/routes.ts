/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import fs from 'fs'
import { join } from 'path'


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

router.get('misTiquetes/:usuario_id', [TiquetesController, 'misTiquetes'])

router.post('login', [UsuariosController, 'login'])

router.get('/postman', async ({response}) => {
  const filePath = join(process.cwd(), 'docs/ColombiaTour.postman_collection.json')
    const file = fs.readFileSync(filePath, 'utf-8')

  response.header('Content-Type', 'application/json')
  return file
})