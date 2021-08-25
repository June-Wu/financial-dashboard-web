import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonComponent } from "@syncfusion/ej2-angular-buttons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'financial-dashboard-web';

  @ViewChild('sidebar') sidebar: SidebarComponent;
  public type: string = 'Push';
  public target: string = 'content';
  public enablePersistence: boolean = true;

  @ViewChild('togglebtn') togglebtn: ButtonComponent;

  constructor() { }

  btnClick() {
    if (this.togglebtn.element.classList.contains('e-active')) {
        this.sidebar.hide();
    } else {
        this.sidebar.show();
    }
  }
}
