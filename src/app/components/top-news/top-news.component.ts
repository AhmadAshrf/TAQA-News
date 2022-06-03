import { TopModule } from './../../models/top.module';
import { TopService } from './../../services/top.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-top-news',
  templateUrl: './top-news.component.html',
  styleUrls: ['./top-news.component.scss']
})

export class TopNewsComponent implements OnInit, OnDestroy {

  public topNews!: TopModule[]
  private componentSubscription

  constructor(private _topNewsService: TopService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._topNewsService.getAllTopNews().pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (top: any) => {
        let news: TopModule[] = top.Data
        this.topNews = news
      },
      error: (err: Error) => { console.log(err.message) }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next()
    this.componentSubscription.complete()
  }
}
