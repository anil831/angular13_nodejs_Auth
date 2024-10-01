import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenAccessTableComponent } from './screen-access-table.component';

describe('ScreenAccessTableComponent', () => {
  let component: ScreenAccessTableComponent;
  let fixture: ComponentFixture<ScreenAccessTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScreenAccessTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenAccessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
