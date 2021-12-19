import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindDirectionsParentComponent } from './wind-directions-parent.component';

describe('WindDirectionsParentComponent', () => {
  let component: WindDirectionsParentComponent;
  let fixture: ComponentFixture<WindDirectionsParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindDirectionsParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindDirectionsParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
