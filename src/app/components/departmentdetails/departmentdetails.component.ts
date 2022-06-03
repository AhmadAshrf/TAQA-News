import { DepartmentByIDModule } from './../../models/department.module';
import { DepartmentServiceService } from './../../services/department-service.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-departmentdetails',
  templateUrl: './departmentdetails.component.html',
  styleUrls: ['./departmentdetails.component.scss']
})

export class DepartmentdetailsComponent implements OnInit, OnDestroy {

  public departmentDatail: DepartmentByIDModule[] = []
  public isPageLoaded: boolean = true
  private componentSubscription

  constructor(private _departmentDetailService: DepartmentServiceService,
    private _activatedRoute: ActivatedRoute) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.pipe(
      takeUntil(this.componentSubscription)
    ).subscribe(param => {
      let id = Number(param.get('id'))
      this.getDepartmentByid(id)
    })
  }

  getDepartmentByid(ID: number) {
    this._departmentDetailService.getDepartmentByID(ID).pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (departmentNews: any) => {
        let news: DepartmentByIDModule[] = departmentNews.Data.Result
        this.departmentDatail = news
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
