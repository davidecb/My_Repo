import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntidad } from '../../src/infraestructura/usuario/entidad/usuario.entidad';

export const TypeOrmSQLITETestingModule = () => [
  TypeOrmModule.forRoot({
    type: 'postgres',
    database: ':memory:',
    dropSchema: true,
    entities: [UsuarioEntidad],
    synchronize: true,
  }),
  TypeOrmModule.forFeature([UsuarioEntidad]),
];