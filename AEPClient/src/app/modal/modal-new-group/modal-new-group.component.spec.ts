import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewGroupComponent } from './modal-new-group.component';

describe('ModalNewGroupComponent', () => {
  let component: ModalNewGroupComponent;
  let fixture: ComponentFixture<ModalNewGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNewGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
