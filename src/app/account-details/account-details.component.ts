import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/models/Account';
import { Investment } from 'src/models/Investment';
import { FinancialService } from 'src/services/financial.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailsComponent implements OnInit {

  @Input() 
  account: Account =  {accountId: 0,
                        userId: 1001,
                        name: "",
                        accountType: "Investment",
                        value: 0
                      };

  constructor(private modalService: NgbModal,  private financialService: FinancialService) { }

  ngOnInit(): void {
  }

  openLg(content: any) {
    if (this.account.accountType == "Investment") {
      this.getInvestmentsByIdParams.aid = this.account.accountId;
      this.getInvestmentsByAccountId();
    }
    this.modalService.open(content, { size: 'lg' });
  }

  //Parameters
  getInvestmentsByIdParams = {aid: 0}

  reportInvestmentsList:Investment[] = [];

  getInvestmentsByAccountId():void {
    this.financialService.geAccountInvestments(this.getInvestmentsByIdParams)
    .subscribe((data:any) => {
      this.reportInvestmentsList = data;
      console.log(this.reportInvestmentsList)
    });
  }
}
