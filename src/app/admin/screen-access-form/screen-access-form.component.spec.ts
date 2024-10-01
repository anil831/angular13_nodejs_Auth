import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenAccessFormComponent } from './screen-access-form.component';

describe('ScreenAccessFormComponent', () => {
  let component: ScreenAccessFormComponent;
  let fixture: ComponentFixture<ScreenAccessFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenAccessFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenAccessFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
