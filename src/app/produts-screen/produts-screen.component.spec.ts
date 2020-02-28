import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutsScreenComponent } from './produts-screen.component';

describe('ProdutsScreenComponent', () => {
  let component: ProdutsScreenComponent;
  let fixture: ComponentFixture<ProdutsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
