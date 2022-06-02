import { Component, Inject, OnInit } from '@angular/core';
import fechaObj from 'fecha';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-producto',
  templateUrl: './new-producto.component.html',
  styleUrls: ['./new-producto.component.css']
})
export class NewProductoComponent implements OnInit  {
  save = 2;
  myForm: FormGroup;
  public fecha = '';
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public Api: ApiService,
    /* public dialogRef: MatDialogRef<NewRegisterComponent>, */
    /* @Inject(MAT_DIALOG_DATA) public data: any */
  ) { }

  ngOnInit() {
    this.fecha = fechaObj.format(new Date(), 'YYYY[/]MM[/]D');
    this.sForm();
    this.Api.GetFormsList();
    this.myForm.patchValue({fecha: this.fecha});
  }

  sForm() {
    this.myForm = this.fb.group({
      clave: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      stock: [''],
      fecha: [''],
      precio: ['', [Validators.required]]
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.Api.AddProducto(this.myForm.value);
    this.toastr.success('Guardado!');
    this.ResetForm();
    /* this.close(); */
  }

  /* close() {
    this.dialogRef.close(this.myForm);
  } */
}
