import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetSettingsComponent } from './widget-settings-component/widget-settings-component';
import { TestDirective } from './test.directive';

@NgModule({
  declarations: [WidgetSettingsComponent, TestDirective],
  imports: [
    CommonModule
  ]
})
export class WidgetSettingsModule { }
