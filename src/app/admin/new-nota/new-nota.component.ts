import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad/angular2-signaturepad';
import 'fecha';
import fechaObj from 'fecha';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
// import { Ng2ImgMaxService } from 'ng2-img-max';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { CurrencyPipe } from '@angular/common';
import { Form } from 'src/app/models/form';
import {NgForm} from '@angular/forms';
import * as jquery from 'jquery';
import { Select2Data, Select2Module } from 'ng-select2-component';
import { Producto } from 'src/app/models/producto';

@Component({
  selector: 'app-new-nota',
  templateUrl: './new-nota.component.html',
  styleUrls: ['./new-nota.component.css']
})
export class NewNotaComponent implements OnInit {

  public canvasWidth = 180;
  public needleValue = 50;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'red',
    needleUpdateSpeed: 1000,
    /* arcColors: ['red', 'yellow', 'black'],
    arcDelimiters: [33, 67], */
    arcColors: ['black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black', 'white', 'black'],
    arcDelimiters: [6, 17, 21, 32, 36, 47, 53, 64, 68, 79, 83, 94],
    rangeLabel: ['E', 'F'],
    needleStartValue: 50,
  };
  ord = 0;
  myformValuesChanges$;
  myformValuesChanges2$;
  total = 0;
  totalr = 0;
  iva = 0;
  obra = 0;
  otros = 0;
  cargos = 0;
  seguro = 0;
  subtotal = 0;
  anticipo = 0;
  saldo = 0;

  public air = false;
  public eng = false;
  public abs = false;
  public oil = false;
  public bat = false;
  public cin = false;
  public fre = false;
  public lig = false;
  public sta = false;
  public tem = false;
  public tal = false;
  public pre = false;
  public vol = false;
  public lock = false;
  public fecha = '';
  public nameC = '';
  public ingresoC = '';
  public salidaC = '';
  idiomaA = 'espaniol';
  uploadedImage: Blob;
  public filePathI1 = '';
  public filePathI2 = '';
  public filePathI3 = '';
  public filePathI4 = '';
  public filePathf1 = '';
  public filePathf2 = '';
  public filePathf3 = '';
  public filePathf4 = '';

  @ViewChild('sig1', { static: false }) signaturePad: SignaturePad;
  @ViewChild('sig2', { static: false }) signaturePad2: SignaturePad;
  @ViewChild('sig3', { static: false }) signaturePad3: SignaturePad;
  @ViewChild('sig4', { static: false }) signaturePad4: SignaturePad;
  public signaturePadOptions: object = {
    minWidth: 0.7,
    maxWidth: 0.8,
    penColor: 'rgb(255,0,0)',
    canvasWidth: 180, // 189
    canvasHeight: 125 // 125
  };
  save = 2;
  presu = false;
  forms: Form[];
  productos: Producto[];
  ff = new Date;
  myForm: FormGroup;
  orden = {
    tcar: 'sedan',
    gas: 50
  };

  @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
    // console.log('Processing beforeunload...');
    // Do more processing...
    event.returnValue = false;
  }
  constructor(
    private fb: FormBuilder,
    public formApi: ApiService,
    public toastr: ToastrService,
    private currencyPipe: CurrencyPipe,
    // private ng2ImgMax: Ng2ImgMaxService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.sForm();
    this.formApi.GetFormsList().snapshotChanges().subscribe(data => {
      this.forms = [];
      data.forEach(item => {
        const form = item.payload.toJSON();
        form['$key'] = item.key;
        this.forms.push(form as Form);
      });
    });
    this.formApi.GetProductosList().snapshotChanges().subscribe(data => {
      this.productos = [];
      data.forEach(item => {
        const producto = item.payload.toJSON();
        producto['$key'] = item.key;
        this.productos.push(producto as Producto);
      });
    });
    this.formApi.getLastNota().subscribe(res=> {
      if(res[0]){
        this.ord = Number(res[0].orden);
        this.myForm.patchValue({orden: String(this.ord + 1).padStart(6, '0')});      
      } else {
        this.myForm.patchValue({orden: String(1).padStart(6, '0')});      
      }
    });
    this.fecha = fechaObj.format(new Date(), 'D [/] MM [/] YYYY');
    this.myForm.patchValue({ fecha: this.fecha });
    /* this.myForm.patchValue({ ingreso: new Date() }); */
    //this.myForm.patchValue({ ingreso: this.ff.getFullYear() + '-' + ('0' + (this.ff.getMonth() + 1)).slice(-2) + '-' + ('0' + this.ff.getDate()).slice(-2) });
    //this.ingresoC = this.ff.getFullYear() + '-' + ('0' + (this.ff.getMonth() + 1)).slice(-2) + '-' + ('0' + this.ff.getDate()).slice(-2);
    this.generRow();
    this.myformValuesChanges$ = this.myForm.controls['units'].valueChanges;
    this.myformValuesChanges$.subscribe(units => {
      this.updateTotalUnitPrice(units);
    });
    /* this.myForm.get('nombre').valueChanges.subscribe(value => this.nameS(value));
    jquery('.select2').select2();
    jquery('#nombre').on('change', function(ev) {
      jquery('#nnombre').val(jquery('#'+this.value+'_n').text());
      jquery('#ttel').val(jquery('#'+this.value).text());
      jquery('#ddomicilio').val(jquery('#'+this.value+'_d').text());
    });
    jquery('#clave0').on('change', function(ev) {
      jquery('#cclave0').val(jquery('#'+this.value+'_c').text());
      jquery('#ddesc0').val(jquery('#'+this.value+'_d').text());
      jquery('#iimporte0').val(Number(jquery('#'+this.value+'_p').text())).trigger('change');
    }); */
  }

  private generRow() {
    for (let i = 1; i < 17; i++) {
      this.addUnit();
    }
  }
  private getUnit() {
    return this.fb.group({
      cantidad: [''],
      importe: [''],
      desc: [''],
      subtotal: [''],
      clave: [''],
      cc: ['']
    });
  }

  public c0(){ jquery('#ccantidad0').val(''); jquery('#ssubtotal0').val(''); }
  public c1(){ jquery('#ccantidad1').val(''); jquery('#ssubtotal1').val(''); }
  public c2(){ jquery('#ccantidad2').val(''); jquery('#ssubtotal2').val(''); }
  public c3(){ jquery('#ccantidad3').val(''); jquery('#ssubtotal3').val(''); }
  public c4(){ jquery('#ccantidad4').val(''); jquery('#ssubtotal4').val(''); }
  public c5(){ jquery('#ccantidad5').val(''); jquery('#ssubtotal5').val(''); }
  public c6(){ jquery('#ccantidad6').val(''); jquery('#ssubtotal6').val(''); }
  public c7(){ jquery('#ccantidad7').val(''); jquery('#ssubtotal7').val(''); }
  public c8(){ jquery('#ccantidad8').val(''); jquery('#ssubtotal8').val(''); }
  public c9(){ jquery('#ccantidad9').val(''); jquery('#ssubtotal9').val(''); }
  public c10(){ jquery('#ccantidad10').val(''); jquery('#ssubtotal10').val(''); }
  public c11(){ jquery('#ccantidad11').val(''); jquery('#ssubtotal11').val(''); }
  public c12(){ jquery('#ccantidad12').val(''); jquery('#ssubtotal12').val(''); }
  public c13(){ jquery('#ccantidad13').val(''); jquery('#ssubtotal13').val(''); }
  public c14(){ jquery('#ccantidad14').val(''); jquery('#ssubtotal14').val(''); }
  public c15(){ jquery('#ccantidad15').val(''); jquery('#ssubtotal15').val(''); }
  public c16(){ jquery('#ccantidad16').val(''); jquery('#ssubtotal16').val(''); }

  private updateTotalUnitPrice(units: any) {
    const control = this.myForm.controls['units'] as FormArray;
    this.totalr = 0;
    // tslint:disable-next-line: forin
    for (let i in units) {
      if(units[i].cc){
        this.formApi.GetProducto(units[i].cc).valueChanges().subscribe(data => {
            if (data.precio &&  data.descripcion){
              control.at(+i).get('clave').setValue(data.clave, {onlySelf: true, emitEvent: false});
              control.at(+i).get('importe').setValue(data.precio, {onlySelf: true, emitEvent: false});
              control.at(+i).get('desc').setValue(data.descripcion, {onlySelf: true, emitEvent: false});
            }
          });
      }
      let totalUnitPrice = 0;
      totalUnitPrice = ((units[i].cantidad > 0 && units[i].importe > 0) ? units[i].cantidad * units[i].importe : 0);
     /*  totalUnitPrice += (units[i].cantidad ? units[i].cantidad : 0);
      totalUnitPrice += (units[i].importe ? units[i].importe : 0);
      totalUnitPrice += (units[i].pintura ? units[i].pintura : 0);
      totalUnitPrice += (units[i].glo ? units[i].glo : 0); */
      const totalUnitPriceFormatted = this.currencyPipe.transform(totalUnitPrice, 'USD', 'symbol-narrow', '1.2-2');

      if (totalUnitPrice !== 0) {
        control.at(+i).get('subtotal').setValue(totalUnitPriceFormatted, {onlySelf: true, emitEvent: false});
      } else {
        control.at(+i).get('subtotal').setValue('', {onlySelf: true, emitEvent: false});
      }
      this.totalr += totalUnitPrice;
    }
    this.subtotal = this.totalr;// + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    if (this.myForm.get('iva').value){
      this.iva = Math.round(this.subtotal * 0.16);
    }else {
      this.iva = 0;
    }
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.anticipo;
    /* this.iva = Math.round(this.totalr * 0.16);
    this.total = this.totalr + this.iva; */
  }

  private addUnit() {
    const control = this.myForm.controls['units'] as FormArray;
    control.push(this.getUnit());
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      orden: ['', [Validators.required]],
      domicilio: [''],
      unidad: [''],
      modelo: [''],
      placas: [''],
      km: [''],
      serie: [''],
      tel: [''],
      observ: [''],
      tarjeta: [false],
      efectivo: [false],
      transferencia: [false],
      presupuesto: [false],
      firma1: [''],
      fecha: [''],
      antici: [0],
      iva: [false],
      units: this.fb.array([
        this.getUnit()
      ])
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.formApi.AddNota(this.myForm.value);
    this.toastr.success('Guardado!');
    /* this.needleValue = 50; */
    this.ResetForm();
    /* this.clear1();
    this.clear2();
    this.clear3();
    this.clear4(); */
    this.myForm.patchValue({fecha: this.fecha});
  }

  updt() {
    /* this.subtotal = this.totalRef + this.obra + this.otros; */
    this.subtotal = this.totalr;// + this.myForm.get('manoo').value + this.myForm.get('cargos').value + this.myForm.get('otrosm').value + this.myForm.get('seguro').value;
    /* this.iva = Math.round(this.subtotal * 0.16); */
    if (this.myForm.get('iva').value){
      this.iva = Math.round(this.subtotal * 0.16);
    }else {
      this.iva = 0;
    }
    this.total = this.subtotal + this.iva;
    this.saldo = this.total - this.myForm.get('antici').value;
  }

  nameS(ev) {
    this.formApi.GetForm(ev.srcElement.value).valueChanges().subscribe(data => {
    /* this.formApi.GetForm(ev).valueChanges().subscribe(data => { */
      if (data.nombre && data.tel && data.domicilio){
        this.myForm.patchValue({domicilio: data.domicilio});
        this.myForm.patchValue({tel: data.tel});
        this.myForm.patchValue({nombre: data.nombre});
        this.nameC = data.nombre;
      }
    });
  }

  /* presupuesto(){
    this.myForm.patchValue({presupuesto: })
  } */

  imgChanged($event) {
    if ($event.target.src) {
      const imgURL = $event.target.src;
      const block = imgURL.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];
      const blob = this.b64toBlob(realData, contentType);
      /* const filePath = `signs/image_${Date.now()}`; */
      this.filePathf1 = `signs_afinauto/image_${Date.now()}`;
      const fileRef = this.storage.ref(this.filePathf1);
      this.storage.upload(this.filePathf1, blob).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.myForm.patchValue({firma1: url});
            this.toastr.success('Firma Actualizada!');
          });
        })
      ).subscribe();
    }
  }

  b64toBlob(b64Data, contentType, sliceSize?) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

}


