import { MenuModule } from './../../models/menu.module';
import { HeaderMenuService } from './../../services/header-menu.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})



export class HeaderComponent implements OnInit, OnDestroy {

  public menu!: MenuModule[]
  private componentSubscription

  constructor(private _headerMenuService: HeaderMenuService) {
    this.componentSubscription = new Subject<void>()
  }

  ngOnInit(): void {
    this._headerMenuService.getAllDepartmentMenu().pipe(
      takeUntil(this.componentSubscription)
    ).subscribe({
      next: (departments: any) => {
        let filterData: MenuModule[] = departments.Data
        this.menu = filterData.filter(el => el.ShowInMainMenu == true)
      },
      error: (err: Error) => { console.log(err.message) }
    })
  }

  ngOnDestroy(): void {
    this.componentSubscription.next()
    this.componentSubscription.complete()
  }
}
