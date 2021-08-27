import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { MenuItemModel } from '@syncfusion/ej2-navigations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'financial-dashboard-web';

  @ViewChild('sidebarInstance')
  public sidebarInstance!: SidebarComponent;
  public width: string = '220px';
  public mediaQuery: string = ('(min-width: 600px)');
  public target: string = '.main-content';
  public dockSize: string = '50px';
  constructor(private _router: Router) {
  }
  public menuItems: MenuItemModel[] = [
      {
          text: 'Overview',
          iconCss: 'icon-eye icon',
      },{
          text: 'Accounts',
          iconCss: 'icon-user icon',
          items: [
              { text: 'Banking' },
              { text: 'Investment' },
              { text: 'History' }
          ]
    },{
      text: 'Markets',
      iconCss: 'icon-globe icon',
      items: [
          { text: 'Explore' },
          { text: 'Watchlists' },
          { text: 'Crypto' },
          { text: 'News' }
      ]
    },{
      text: 'Notifications',
      iconCss: 'icon-bell-alt icon',
      items: [
          { text: 'Inbox' },
          { text: 'Alerts' },
      ]
  },{
          text: 'Settings',
          iconCss: 'icon-cog icon',
          items: [
              { text: 'Privacy' },
              { text: 'Permissions' },
              { text: 'Configuration' }
          ]
      }
  ];
   public AccountMenuItem: MenuItemModel[] = [
      {
          text: 'Account',
          items: [
            { text: 'Profile' },
            { text: 'Manage' },
            { text: 'Sign out' },
          ]
      }
  ];

  menuItemClick(arg: any) {
    console.log(arg.item);
    if (arg.item.text == "Overview") {
      this._router.navigate(['/overview']);
    } else if (arg.item.text == "Accounts") {
      this._router.navigate(['/accounts']);
    } else if (arg.item.text == "Banking") {
      this._router.navigate(['/banking']);
    } else if (arg.item.text == "Investment") {
      this._router.navigate(['/investment']);
    } else if (arg.item.text == "History") {
      this._router.navigate(['/account-history']);
    } else if (arg.item.text == "Markets") {
      this._router.navigate(['/markets']);
    }
  }

  accountItemClick(arg: any) {
    console.log(arg.item);
    if (arg.item.text == "Profile") {
      this._router.navigate(['/user-profile']);
    }
  }

  openSidebarClick() {
      this.sidebarInstance.toggle();
  }
  
}
