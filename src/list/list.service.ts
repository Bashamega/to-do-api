import { Injectable } from '@nestjs/common';
import { Task } from './entities/list.entity';

@Injectable()
export class ListService {
  private list: Task[] = [];
  tasks() {
    const keys = [];
    this.list.forEach((task) => {
      keys.push(task.id);
    });
    return keys;
  }
  findTask(id: number) {
    return this.list.find((item) => item.id === +id);
  }
  createTask(task: Task) {
    this.list.push(task);
  }
  update(id: number, updatedData: Task) {
    const currentData = this.findTask(id);
    if (currentData) {
      this.removeTask(id);
      this.createTask(updatedData);
    }
  }
  removeTask(id: number) {
    const index = this.list.findIndex((item) => item.id === +id);
    if (index >= 0) {
      this.list.splice(index, 1);
    }
  }
}
