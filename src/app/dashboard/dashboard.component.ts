import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingEgrActions from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSb: Subscription;
  ingEgrSb: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.userSb = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.ingEgrSb = this.ingresoEgresoService
          .initIngresosEgresosListener(user.uid)
          .subscribe((ingresosEgresos) => {
            this.store.dispatch(
              ingEgrActions.setItems({ items: ingresosEgresos })
            );
          });
      });
  }

  ngOnDestroy(): void {
    this.ingEgrSb.unsubscribe();
    this.userSb.unsubscribe();
  }
}
