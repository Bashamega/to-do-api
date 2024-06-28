import { Injectable } from '@nestjs/common';
import { Task } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Task)
    private readonly ListRepository: Repository<Task>,
  ) {}
  async tasks() {
    const keys = [];
    const data = await this.ListRepository.find();
    data.forEach((task) => {
      keys.push(task.id);
    });
    return keys;
  }
  async findTask(id: number) {
    const data = await this.ListRepository.find();
    return data.find((item) => item.id === +id);
  }
  createTask(task: Task) {
    const data = this.ListRepository.create(task);
    return this.ListRepository.save(data);
  }
  async update(id: number, updatedData: Task) {
    const data = await this.ListRepository.preload({
      id: +id,
      ...updatedData,
    });
    return this.ListRepository.save(data);
  }
  async removeTask(id: number) {
    const data = await this.findTask(id);
    return this.ListRepository.remove(data);
  }
}
