import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import {JwtInterceptor} from "./service/jwt.interceptor";
import {AuthService} from "./service/auth.service";
import { SorterPipe } from './pipe/sorter.pipe';
import { SumPipe } from './pipe/sum.pipe';
import { FilterPipe } from './pipe/filter.pipe';
import { FilterAllPipe } from './pipe/filter-all.pipe';
import { LimitPipe } from './pipe/limit.pipe';
import { ForbiddenComponent } from './page/forbidden/forbidden.component';
import { DataTableComponent } from './common/data-table/data-table.component';
import { UserComponent } from './page/user/user.component';
import { VehicleComponent } from './page/vehicle/vehicle.component';
import { DestinationComponent } from './page/destination/destination.component';
import { PartnerComponent } from './page/partner/partner.component';
import { TripReasonComponent } from './page/trip-reason/trip-reason.component';
import { TripReasonEditorComponent } from './page/trip-reason-editor/trip-reason-editor.component';
import { PartnerEditorComponent } from './page/partner-editor/partner-editor.component';
import { DestinationEditorComponent } from './page/destination-editor/destination-editor.component';
import { VehicleEditorComponent } from './page/vehicle-editor/vehicle-editor.component';
import { UserEditorComponent } from './page/user-editor/user-editor.component';
import {DynamicFormModule} from "./dynamic-form/dynamic-form.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    SorterPipe,
    SumPipe,
    FilterPipe,
    FilterAllPipe,
    LimitPipe,
    ForbiddenComponent,
    DataTableComponent,
    UserComponent,
    VehicleComponent,
    DestinationComponent,
    PartnerComponent,
    TripReasonComponent,
    TripReasonEditorComponent,
    PartnerEditorComponent,
    DestinationEditorComponent,
    VehicleEditorComponent,
    UserEditorComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, //
    HttpClientModule, //
    BrowserAnimationsModule,
    DynamicFormModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
