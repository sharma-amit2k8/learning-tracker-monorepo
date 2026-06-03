import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseModal } from './add-course-modal';

describe('AddCourseModal', () => {
  let component: AddCourseModal;
  let fixture: ComponentFixture<AddCourseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCourseModal],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCourseModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
