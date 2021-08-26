import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountHistoryGraphComponent } from './account-history-graph.component';

describe('AccountHistoryGraphComponent', () => {
  let component: AccountHistoryGraphComponent;
  let fixture: ComponentFixture<AccountHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountHistoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
