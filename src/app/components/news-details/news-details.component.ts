import { DetailsModel } from './../../models/details.model';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DetailsService } from 'src/app/services/details.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})

export class NewsDetailsComponent implements OnInit, OnDestroy {

  public news!: DetailsModel
  public isPageLoaded: boolean = true
  private componentSubscription

  constructor(private _detailsService: DetailsService, private _activateRoute: ActivatedRoute) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._activateRoute.paramMap.pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (param) => {
        let id = Number(param.get('id'))
        this.getNewsDetails(id)
      },
      error: (err: Error) => { console.log(err.message) }
    })
  }

  getNewsDetails(ID: number) {
    this._detailsService.getNewsDetails(ID).pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (response: any) => {
        let castingData: DetailsModel = response.Data
        this.news = castingData
        this.isPageLoaded = false
      }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next()
    this.componentSubscription.complete()
  }
}
