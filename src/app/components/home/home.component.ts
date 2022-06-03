import { TopService } from './../../services/top.service';
import { HomeModule } from './../../models/home.module';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { take, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

  public homeNews!: HomeModule[]
  public isPageLoaded: boolean = true
  private componentSubscription

  constructor(private _homeService: TopService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._homeService.getAllTopNews().pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (news: any) => {
        let home: HomeModule[] = news.Data
        this.homeNews = home
        this.isPageLoaded = false
      },
      error: (err: Error) => { console.log(err.message) }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next()
    this.componentSubscription.complete()
  }
}
