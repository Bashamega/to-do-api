import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [ListController],
  providers: [ListService],
})
export class ListModule {}
