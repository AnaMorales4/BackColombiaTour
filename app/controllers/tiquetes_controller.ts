import Tiquete from '#models/tiquete'
import Tour from '#models/tour'
import Usuario from '#models/usuario'
import type { HttpContext } from '@adonisjs/core/http'

export default class TiquetesController {
        /**
       * Return list of all posts or paginate through
       * them
       */
      async index({}: HttpContext) {
        return await Tiquete.query().paginate(1, 10)
      }
    
      /**
       * Handle form submission to create a new post
       */
      async store({ request }: HttpContext) {
        const data = request.only(['usuario_id', 'tour_id', 'cant_personas', 'total'])

        const usuario = await Usuario.find(data.usuario_id)
        if (!usuario) {
          return { message: 'Usuario no encontrado' }
        }
        
        const tour = await Tour.find(data.tour_id)
        if (!tour) {
          return { message: 'Tour no encontrado' }
        }

        if (data.cant_personas > tour.cupos_disponibles) {
          return { message: 'No hay cupos disponibles para este tour' }
        }

        data.total = data.cant_personas * tour.precio

        const tiquete = await Tiquete.create(data)

        tour.cupos_disponibles -= data.cant_personas
        await tour.save()
        
        return tiquete
      }
    
      /**
       * Display a single post by id.
       */
      async show({ params }: HttpContext) {
        const tiquete = await Tiquete.find(params.id)
        if (!tiquete) {
          return { message: 'Tiquete no encontrado' }
        }
        return tiquete
      }
    
      /**
       * Handle the form submission to update a specific post by id
       */
      async update({ params, request }: HttpContext) {
        const tiquete = await Tiquete.find(params.id)
        if (!tiquete) {
          return { message: 'Tiquete no encontrado' }
        }
    
        const data = request.only(['usuario_id', 'tour_id', 'cant_personas', 'total'])

        if (tiquete.tour_id !== data.tour_id) {
           return { message: 'No se puede cambiar de tour' }           
        }
        const tour = await Tour.find(tiquete.tour_id)
        if (!tour) {
            return { message: 'Tour no encontrado' }
        }

        if (data.cant_personas > tour.cupos_disponibles + tiquete.cant_personas) {
            return { message: 'No hay cupos disponibles para este tour' }
        }

        if (data.cant_personas < tiquete.cant_personas) {
          const diferencia = tiquete.cant_personas - data.cant_personas
          tour.cupos_disponibles += diferencia
        }

        const nuevo_total = data.cant_personas * tour.precio
        data.total = nuevo_total 
        
        tiquete.merge(data)
        await tour.save()
        await tiquete.save()
        return tiquete
      }
    
      /**
       * Handle the form submission to delete a specific post by id.
       */
      async destroy({ params }: HttpContext) {
        const tiquete = await Tiquete.find(params.id)
        if (!tiquete) {
          return { message: 'Tiquete no encontrado' }
        }
        await tiquete.delete()

        const tour = await Tour.find(tiquete.tour_id)
        if (tour) {
          tour.cupos_disponibles += tiquete.cant_personas
          await tour.save()
        }
        return { message: 'Tiquete eliminado correctamente' }
      }
      
}