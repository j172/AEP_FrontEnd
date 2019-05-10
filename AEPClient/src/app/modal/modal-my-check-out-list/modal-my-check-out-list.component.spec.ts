import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMyCheckOutListComponent } from './modal-my-check-out-list.component';

describe('ModalMyCheckOutListComponent', () => {
  let component: ModalMyCheckOutListComponent;
  let fixture: ComponentFixture<ModalMyCheckOutListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMyCheckOutListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMyCheckOutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
