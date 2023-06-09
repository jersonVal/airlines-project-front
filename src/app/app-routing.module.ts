import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/home" },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'calculate-flight',
    loadChildren: () =>
      import("./modules/calculate-flight/calculate-flight.module").then(
        (m) => m.CalculateFlightModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
