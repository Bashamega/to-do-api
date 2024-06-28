import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Mm@123',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true
  })],
  controllers: [AppController, ListController],
  providers: [AppService, ListService],
})
export class AppModule {}
