import { Component, OnInit, ViewEncapsulation, Input  } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Account } from 'src/models/Account';
import { Investment } from 'src/models/Investment';
import { FinancialService } from 'src/services/financial.service';
import { InvestmentsService } from 'src/services/investments.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailsComponent implements OnInit {

  @Input() 
  account: Account =  {accountId: 12345,
                        userId: 1001,
                        name: "",
                        accountType: "Investment",
                        value: 0
                      };

  constructor(private modalService: NgbModal, private investmentsService: InvestmentsService, private financialService: FinancialService) { }

  ngOnInit(): void {
    if (this.account.accountType == "Investment") {
      this.getInvestmentsByAccountId();
    }

  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  //Parameters
  getInvestmentsByIdParams = {aid: this.account.accountId}

  reportInvestmentsList:Investment[] = [];

  getInvestmentsByAccountId():void {
    this.financialService.geAccountInvestments(this.getInvestmentsByIdParams)
    .subscribe((data:any) => {
      this.reportInvestmentsList = data;
    });
  }
}
