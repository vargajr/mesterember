import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceeditComponent } from './serviceedit.component';

describe('ServiceeditComponent', () => {
  let component: ServiceeditComponent;
  let fixture: ComponentFixture<ServiceeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
