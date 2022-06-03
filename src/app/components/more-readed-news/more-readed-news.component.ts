import { MoreModule } from './../../models/more.module';
import { MoreService } from './../../services/more.service';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-more-readed-news',
  templateUrl: './more-readed-news.component.html',
  styleUrls: ['./more-readed-news.component.scss']
})

export class MoreReadedNewsComponent implements OnInit, OnDestroy {

  public moreNews!: MoreModule[]
  private componentSubscription

  constructor(private _moreService: MoreService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._moreService.getAllMore().pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (news: any) => {
        let topNews: MoreModule[] = news.Data
        this.moreNews = topNews
      },
      error: (err: Error) => { console.log(err.message) }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next()
    this.componentSubscription.complete()
  }
}
