import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

const uiModules = [
  MatIconModule
];

@NgModule({
  imports: uiModules,
  exports: uiModules
})
export class AppUiModule { }