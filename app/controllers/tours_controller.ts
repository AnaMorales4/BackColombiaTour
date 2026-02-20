import type { HttpContext } from '@adonisjs/core/http'
import Tour from '#models/tour'

export default class ToursController {
    /**
   * Return list of all posts or paginate through
   * them
   */
  async index({request}: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    
    return await Tour.query().paginate(page, limit)
  }

  /**
   * Handle form submission to create a new post
   */
  async store({ request }: HttpContext) {
    const data = request.body()

    if (Array.isArray(data)){
      const tours = await Tour.createMany(data)
      return tours
    }
    const tour = await Tour.create(data)
    return tour
  }

  /**
   * Display a single post by id.
   */
  async show({ params }: HttpContext) {
    const tour = await Tour.find(params.id)
    if (!tour) {
      return { message: 'Tour no encontrado' }
    }
    return tour
  }

  /**
   * Handle the form submission to update a specific post by id
   */
  async update({ params, request }: HttpContext) {
    const tour = await Tour.find(params.id)
    if (!tour) {
      return { message: 'Tour no encontrado' }
    }

    const data = request.only(['nombre_destino', 'descripcion', 'precio', 'estado', 'cupos_disponibles', 'imagen', 'fecha_tour'])
    tour.merge(data)
    await tour.save()
    return tour
  }

  /**
   * Handle the form submission to delete a specific post by id.
   */
  async destroy({ params }: HttpContext) {
    const tour = await Tour.find(params.id)
    if (!tour) {
      return { message: 'Tour no encontrado' }
    }
    await tour.delete()
    return { message: 'Tour eliminado correctamente' }
  }
}