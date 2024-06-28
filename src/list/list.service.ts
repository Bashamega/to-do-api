import { Injectable } from '@nestjs/common';
import { Task } from './entities/list.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ListService {
  constructor(
    @InjectRepository(Task)
    private readonly listRepository: Repository<Task>,
  ) {}

  async getTasks(): Promise<number[]> {
    const data = await this.listRepository.find();
    const keys = [];
    data.forEach((item) => keys.push(item.id));
    return keys;
  }

  async getTaskById(id: number) {
    const task = await this.listRepository.findOne({ where: { id } });
    return task;
  }
  async taskExist(id: number) {
    const data = await this.getTaskById(id);
    return data;
  }

  async createTask(task: Task): Promise<Task> {
    const newTask = this.listRepository.create(task);
    return await this.listRepository.save(newTask);
  }

  async updateTask(id: number, updatedData: Partial<Task>): Promise<Task> {
    const task = await this.listRepository.preload({
      id: +id,
      ...updatedData,
    });
    return await this.listRepository.save(task);
  }

  async removeTask(id: number): Promise<void> {
    const task = await this.getTaskById(id);
    await this.listRepository.remove(task);
  }
}
