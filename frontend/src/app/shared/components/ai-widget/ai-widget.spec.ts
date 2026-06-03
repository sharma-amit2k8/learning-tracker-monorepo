import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiWidget } from './ai-widget';

describe('AiWidget', () => {
  let component: AiWidget;
  let fixture: ComponentFixture<AiWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(AiWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
