import { TypeOrmModule } from '@nestjs/typeorm';

export const databaseProviders = [
    TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'nest',
       
        autoLoadEntities: true,
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}'
        ],
        synchronize: true,
        
    }),
];