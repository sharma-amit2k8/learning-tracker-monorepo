import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiInput } from './ai-input';

describe('AiInput', () => {
  let component: AiInput;
  let fixture: ComponentFixture<AiInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiInput],
    }).compileComponents();

    fixture = TestBed.createComponent(AiInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
