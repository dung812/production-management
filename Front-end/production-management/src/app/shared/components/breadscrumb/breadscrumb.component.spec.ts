import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadscrumbComponent } from './breadscrumb.component';

describe('BreadscrumbComponent', () => {
  let component: BreadscrumbComponent;
  let fixture: ComponentFixture<BreadscrumbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadscrumbComponent]
    });
    fixture = TestBed.createComponent(BreadscrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
