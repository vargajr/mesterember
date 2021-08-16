import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpickerComponent } from './userpicker.component';

describe('UserpickerComponent', () => {
  let component: UserpickerComponent;
  let fixture: ComponentFixture<UserpickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
