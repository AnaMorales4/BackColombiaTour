import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Tiquete extends BaseModel {
  @column({ isPrimary: true })
  declare id_tiquete: number

  @column()
  declare usuario_id: number

  @column()
  declare id_tour: number

  @column()
  declare cant_personas: number

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare fecha_compra: DateTime
}