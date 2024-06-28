import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks-db')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  done: boolean;

  constructor(id: number, title: string, description: string, done: boolean) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
  }
}

export function isTask(obj: any): obj is Task {
  return (
    obj &&
    typeof obj.id === 'number' &&
    typeof obj.title === 'string' &&
    typeof obj.description === 'string' &&
    typeof obj.done === 'boolean'
  );
}
