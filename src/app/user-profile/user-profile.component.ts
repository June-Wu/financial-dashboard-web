import { Component, OnInit } from '@angular/core';
import { FinancialService } from 'src/services/financial.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  paramObj = {category:'movies'}
  userDataObj = { id: 0, title: 'no-name', director: 'anon' }
  
  constructor(private financialService: FinancialService) { }

  ngOnInit(): void {
    this.makeServiceCall();
  }

  makeServiceCall(){
    this.financialService.getUserInfo()
      .subscribe( (data:any)=>{
        this.userDataObj = data
      } )
  }

}
