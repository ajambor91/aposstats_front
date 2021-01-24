import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainService } from './services/main-service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { ChartComponent } from './components/chart/chart.component';
import { BarComponent } from './components/chart/bar/bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { GraphComponent } from './components/chart/graph/graph.component'
import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableComponent } from './components/table/table.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app-config/app-config';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChartComponent,
    BarComponent,
    GraphComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    MatTableModule,
    FormsModule
  ],
  providers: [
    MainService,
    AppConfig,
    DatePipe,
    {provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps :[AppConfig], multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
