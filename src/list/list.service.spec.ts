import { Test, TestingModule } from '@nestjs/testing';
import { ListService } from './list.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './entities/list.entity';

describe('ListService', () => {
  let service: ListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListService,
        { provide: getRepositoryToken(Task), useValue: {} },
      ],
    }).compile();

    service = module.get<ListService>(ListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
