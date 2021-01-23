import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainService } from './services/main-service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { BarComponent } from './components/chart/bar/bar.component';
import { from } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'

import { GraphComponent } from './components/chart/graph/graph.component'
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AddComponentDirective } from './directives/add-component.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChartComponent,
    BarComponent,
    GraphComponent,
    AddComponentDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
