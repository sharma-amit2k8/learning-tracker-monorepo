import { TestBed } from '@angular/core/testing';

import { SnackbarServiceTs } from './snackbar.service.js';

describe('SnackbarServiceTs', () => {
  let service: SnackbarServiceTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarServiceTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
