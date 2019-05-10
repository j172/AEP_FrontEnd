import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryAdComponent } from './query-ad.component';

describe('QueryAdComponent', () => {
  let component: QueryAdComponent;
  let fixture: ComponentFixture<QueryAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueryAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
