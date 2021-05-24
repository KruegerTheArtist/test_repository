import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteCreateFormComponent } from './route-create-form/route-create-form.component';
import { RoutesTableComponent } from './routes-table/routes-table.component';

const routes: Routes = [
  {path: '' , component: RoutesTableComponent},
  {path: 'table' , component: RoutesTableComponent},
  {path: 'create' , component: RouteCreateFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
