import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TopNewsComponent } from './components/top-news/top-news.component';
import { MoreReadedNewsComponent } from './components/more-readed-news/more-readed-news.component';
import { HomeComponent } from './components/home/home.component';
import { DepartmentdetailsComponent } from './components/departmentdetails/departmentdetails.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    TopNewsComponent,
    MoreReadedNewsComponent,
    HomeComponent,
    DepartmentdetailsComponent,
    NewsDetailsComponent,
    MainLayoutComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
