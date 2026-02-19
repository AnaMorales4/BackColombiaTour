import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Tour extends BaseModel {
  @column({ isPrimary: true })
  declare id_tour: number

  @column()
  declare nombre_destino: string

  @column()
  declare descripcion: string

  @column()
  declare precio: number

  @column()
  declare estado: boolean

  @column()
  declare cupo_disponible: number

  @column()
  declare imagen: string

  @column.dateTime({ autoCreate: true })
  declare fecha_tour: DateTime


}