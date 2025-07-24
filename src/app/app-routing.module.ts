import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// *******************************************************************************
// Layouts

// *******************************************************************************
// Pages
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { LayoutWithoutSidenavComponent } from './layout/layout-without-sidenav/layout-without-sidenav.component';

// *******************************************************************************
// Routes

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },    
  { path: 'principal', component: LayoutWithoutSidenavComponent, loadChildren: './home/home.module#HomeModule' },
  
  { path: '**', component: LayoutBlankComponent, loadChildren: './error/error.module#ErrorModule' }
];

// *******************************************************************************
//

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
