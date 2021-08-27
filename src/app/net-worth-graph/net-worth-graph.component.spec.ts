import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetWorthGraphComponent } from './net-worth-graph.component';

describe('NetWorthGraphComponent', () => {
  let component: NetWorthGraphComponent;
  let fixture: ComponentFixture<NetWorthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetWorthGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetWorthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
