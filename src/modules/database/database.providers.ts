import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfig } from 'src/config';
import { join } from "path"
const migrationsPath = join('src', 'migrations')
export const databaseProviders = [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: AppConfig.get<string>('db.host'),
        port: AppConfig.get<number>('db.port'),
        username: AppConfig.get<string>('db.user'),
        password: AppConfig.get<string>('db.password'),
        database: AppConfig.get<string>('db.name'),
        autoLoadEntities: true,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}'
        ],
        "migrationsTableName": "migration_table",
        migrations: [migrationsPath],
        synchronize: true,
        "cli": {
            "migrationsDir": "src/migrations"
        }

    }),
];