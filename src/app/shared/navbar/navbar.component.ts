import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent implements OnInit, OnDestroy {
  userSb: Subscription;
  nombre: string;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.userSb = this.store
      .select('user')
      .pipe(filter(({ user }) => user != null))
      .subscribe(({ user }) => {
        this.nombre = user?.nombre;
      });
  }

  ngOnDestroy(): void {
    this.userSb.unsubscribe();
  }
}
