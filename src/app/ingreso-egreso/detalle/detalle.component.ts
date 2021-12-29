import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../../models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [],
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingEgrSb: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) {}

  ngOnInit(): void {
    this.ingEgrSb = this.store
      .select('ingresosEgresos')
      .subscribe(({ items }) => (this.ingresosEgresos = [...items]));
  }

  borrar(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(() => {
        Swal.fire(
          'Borrado exitoso',
          `El elemento ${uid} fue borrado con éxito`,
          'success'
        );
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
      });
  }

  ngOnDestroy(): void {
    this.ingEgrSb.unsubscribe();
  }
}
