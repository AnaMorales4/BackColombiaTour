import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Usuario from '#models/usuario'
import Tour from '#models/tour'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Tiquete extends BaseModel {
  @column({ isPrimary: true })
  declare id_tiquete: number

  @column()
  declare usuario_id: number

  @column()
  declare tour_id: number

  @column()
  declare cant_personas: number

  @column()
  declare total: number

  @column.dateTime({ autoCreate: true })
  declare fecha_compra: DateTime

  // Relaciones
  @hasOne(() => Usuario, {
    foreignKey: 'id',
    localKey: 'usuario_id',
  })
  declare usuario: HasOne<typeof Usuario>

  @hasOne(() => Tour, {
    foreignKey: 'id_tour',
    localKey: 'tour_id',
  })
  declare tour: HasOne<typeof Tour>
}