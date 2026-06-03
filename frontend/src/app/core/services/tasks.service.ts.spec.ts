import { TestBed } from '@angular/core/testing';

import { TasksServiceTs } from './tasks.service.ts.js';

describe('TasksServiceTs', () => {
  let service: TasksServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
