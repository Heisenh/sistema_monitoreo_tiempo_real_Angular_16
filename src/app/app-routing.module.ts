import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './features/auth/components/auth.component';
import { AuthGuard } from './core/guard/auth-guard.guard';
import { HomeGuard } from './core/guard/home-guard.guard';

const routes: Routes = [
  {
    path: 'login', component: AuthComponent, pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard', loadChildren: () => import('./../app/features/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [HomeGuard]
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
