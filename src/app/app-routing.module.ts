import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { DepartmentdetailsComponent } from './components/departmentdetails/departmentdetails.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: MainLayoutComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'department/:id', component: DepartmentdetailsComponent },
      { path: 'details/:id', component: NewsDetailsComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
