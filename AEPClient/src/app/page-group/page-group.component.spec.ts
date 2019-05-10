import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGroupComponent } from './page-group.component';

describe('GroupComponent', () => {
  let component: PageGroupComponent;
  let fixture: ComponentFixture<PageGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
