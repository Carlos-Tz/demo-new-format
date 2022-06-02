import { Component, Inject, OnInit } from '@angular/core';
import fechaObj from 'fecha';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-producto',
  templateUrl: './edit-producto.component.html',
  styleUrls: ['./edit-producto.component.css']
})
export class EditProductoComponent implements OnInit {
  save = 2;
  myForm: FormGroup;
  key = '';
  public fecha = '';
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public Api: ApiService,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sForm();
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.Api.GetProducto(this.key).valueChanges().subscribe(data => {
      this.myForm.patchValue(data);
    });
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
    this.Api.UpdateProducto(this.myForm.value, this.key);
    this.toastr.success('Actualizado!');
  }

  /* close() {
    this.dialogRef.close(this.myForm);
  } */
}
