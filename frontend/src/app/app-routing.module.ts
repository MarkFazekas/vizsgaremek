import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {LoginComponent} from "./page/login/login.component";
import {ForbiddenComponent} from "./page/forbidden/forbidden.component";
import {UserComponent} from "./page/user/user.component";
import {TripReasonComponent} from "./page/trip-reason/trip-reason.component";
import {PartnerComponent} from "./page/partner/partner.component";
import {VehicleComponent} from "./page/vehicle/vehicle.component";
import {DestinationComponent} from "./page/destination/destination.component";
import {UserEditorComponent} from "./page/user-editor/user-editor.component";
import {VehicleEditorComponent} from "./page/vehicle-editor/vehicle-editor.component";
import {TripReasonEditorComponent} from "./page/trip-reason-editor/trip-reason-editor.component";
import {PartnerEditorComponent} from "./page/partner-editor/partner-editor.component";
import {DestinationEditorComponent} from "./page/destination-editor/destination-editor.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'product',
  //   component: ProductComponent,
  // },
  // {
  //   path: 'product/edit/:id',
  //   component: ProductEditorComponent,
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent,
  },
  {
    path: 'trip-reasons',
    component: TripReasonComponent,
  },
  {
    path: 'partners',
    component: PartnerComponent,
  },
  {
    path: 'vehicles',
    component: VehicleComponent,
  },
  {
    path: 'destinations',
    component: DestinationComponent,
  },
  {
    path: 'users/:id',
    component: UserEditorComponent,
  },
  {
    path: 'vehicles/:id',
    component: VehicleEditorComponent,
  },
  {
    path: 'trip-reasons/:id',
    component: TripReasonEditorComponent,
  },
  {
    path: 'partners/:id',
    component: PartnerEditorComponent,
  },
  {
    path: 'destinations/:id',
    component: DestinationEditorComponent,
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent,
  },
  {
    path: '**',
    component: ForbiddenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
