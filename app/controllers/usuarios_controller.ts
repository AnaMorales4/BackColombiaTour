import type { HttpContext } from '@adonisjs/core/http'
import Usuario from '#models/usuario'
import Status from '@adonisjs/lucid/commands/migration/status'
import { stat } from 'fs'

export default class UsuariosController {
        /**
       * Return list of all posts or paginate through
       * them
       */
      async index({}: HttpContext) {
        return await Usuario.query().paginate(1, 10)
      }
    
      /**
       * Handle form submission to create a new post
       */
      
      async store({ request }: HttpContext) {
        const data = request.only(['nombre', 'email', 'contrasena', 'rol'])
        const existingUser = await Usuario.findBy('email', data.email)
        if (existingUser) {
          return { message: 'Email ya registrado', Status:false }
        }
        const usuario = await Usuario.create(data)
        return { message: 'Usuario creado exitosamente', Status:true, usuario }
      }
    
      /**
       * Display a single post by id.
       */
      async show({ params }: HttpContext) {
        const usuario = await Usuario.find(params.id)
        if (!usuario) {
          return { message: 'Usuario no encontrado' }
        }
        return usuario
      }
    
      /**
       * Handle the form submission to update a specific post by id
       */
      async update({ params, request }: HttpContext) {
        const usuario = await Usuario.find(params.id)
        if (!usuario) {
          return { message: 'Usuario no encontrado' }
        }

        const data = request.only(['nombre', 'email', 'contrasena', 'rol'])
        usuario.merge(data)
        await usuario.save()
        return usuario

      }
    
      /**
       * Handle the form submission to delete a specific post by id.
       */
      async destroy({ params }: HttpContext) {
        const usuario = await Usuario.find(params.id)
        if (!usuario) {
          return { message: 'Usuario no encontrado' }
        }
        await usuario.delete()
        return { message: 'Usuario eliminado correctamente' }
      }


      async login({ request }: HttpContext) {
        const { email, contrasena } = request.only(['email', 'contrasena'])
        const usuario = await Usuario.findBy('email', email)
        if (!usuario) {
          return {message: 'Usuario no encontrado', Status:false}
        } 
        if (usuario.contrasena !== contrasena) {
          return {message: 'Contraseña incorrecta', Status:false}
        } 
        return {message: 'Login exitoso', Status:true, rol: usuario.rol}
         } 
}