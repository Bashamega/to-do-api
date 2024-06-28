import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ListService } from './list.service';
import { Task, isTask } from './entities/list.entity';
@Controller('list')
export class ListController {
  constructor(private readonly listService: ListService) {}
  @Get()
  allTasks() {
    return this.listService.getTasks();
  }
  @Get(':id')
  async specificTask(@Param('id') id: number) {
    if (await this.listService.taskExist(id)) {
      return {
        id: id,
        message: 'Found',
        content: await this.listService.getTaskById(id),
      };
    } else {
      throw new BadRequestException({
        message: 'Please enter a valid id.',
      });
    }
  }
  @Post()
  async addNewTask(@Body() body: Task) {
    if (isTask(body)) {
      
      if (!await this.listService.taskExist(body.id)) {
        await this.listService.createTask(body);
        return {
          message: 'Data recieved',
          content: body,
        };
      } else {
        throw new BadRequestException({
          message: 'Please enter a valid id. This id already exists.',
        });
      }
    } else {
      throw new BadRequestException({
        message: 'Please enter a valid body',
        expectedBody: {
          id: 'number',
          title: 'string',
          description: 'string',
          done: 'boolean',
        },
      });
    }
  }
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() body) {
    if (isTask(body)) {
      if (await this.listService.getTaskById(id)) {
        if (id != body.id && await this.listService.taskExist(id)) {
          throw new BadRequestException({
            message: 'Please enter a valid id.',
          });
        }
        await this.listService.updateTask(id, body);
        return {
          message: 'Data update',
          content: body,
        };
      } else {
        throw new BadRequestException({
          message: 'Please enter a valid id.',
        });
      }
    } else {
      throw new BadRequestException({
        message: 'Please enter a valid body',
        expectedBody: {
          id: 'number',
          title: 'string',
          description: 'string',
          done: 'boolean',
        },
      });
    }
  }
  @Delete(':id')
  async removeTask(@Param('id') id: number) {
    if (await this.listService.taskExist(id)) {
      await this.listService.removeTask(id);
      return {
        message: 'data removed',
      };
    } else {
      throw new BadRequestException({
        message: 'Please enter a valid id.',
      });
    }
  }
}
