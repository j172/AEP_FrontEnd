import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMyAlertmeListComponent } from './modal-my-alertme-list.component';

describe('ModalMyAlertmeListComponent', () => {
  let component: ModalMyAlertmeListComponent;
  let fixture: ComponentFixture<ModalMyAlertmeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMyAlertmeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMyAlertmeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
