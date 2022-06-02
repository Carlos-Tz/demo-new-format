import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatInput } from '@angular/material/input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Producto>();
  save = 2;
  Producto: Producto[];
  data = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('input', {static: false}) input: ElementRef;

  displayedColumns: any[] = [
    'clave',
    'descripcion',
    'precio',
    //'stock',
    'fecha',
    'action'
  ];
  constructor(
    public api: ApiService, private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.GetProductosList().snapshotChanges().subscribe(data => {
      this.Producto = [];
      data.forEach(item => {
        const f = item.payload.toJSON();
        f['$key'] = item.key;
        this.Producto.push(f as Producto);
      });
      if (this.Producto.length > 0) {
        this.data = true;
        this.dataSource.data = this.Producto.slice();
       /*  this.dataSource.sort = this.sort; */
      }
      /* Pagination */
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
    //this.api.GetCita();
  }

  sortData(sort: Sort) {
    const data = this.Producto.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'clave': return this.compare(a.clave.trim().toLocaleLowerCase(), b.clave.trim().toLocaleLowerCase(), isAsc);
        case 'fecha': return this.compare(a.fecha, b.fecha, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  /* openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.matDialog.open(NewRegisterComponent, {
      width: '80%'
    });
    //this.matDialog.open(NewRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  }

  editCliente(key: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = "some data";
    let dialogRef = this.matDialog.open(EditRegisterComponent, {
      width: '80%'
    });
    //this.matDialog.open(NewRegisterComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
    });
  } */

  deleteProducto(key: string){
    if (window.confirm('¿Esta seguro de eliminar el registro seleccionado?')) {
      this.api.DeleteProducto(key);
    }
  }

}
