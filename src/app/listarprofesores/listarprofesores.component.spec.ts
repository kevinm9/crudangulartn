import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarprofesoresComponent } from './listarprofesores.component';

describe('ListarprofesoresComponent', () => {
  let component: ListarprofesoresComponent;
  let fixture: ComponentFixture<ListarprofesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarprofesoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarprofesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
