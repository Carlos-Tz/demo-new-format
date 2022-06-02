import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Call } from 'src/app/models/call';

@Component({
  selector: 'app-edit-register',
  templateUrl: './edit-register.component.html',
  styleUrls: ['./edit-register.component.css']
})
export class EditRegisterComponent implements OnInit {
  save = 2;
  myForm: FormGroup;
  key = '';
  calls: Call[];
  folio = 0;
  @ViewChild('modalC') modalC: TemplateRef<any>;
  @ViewChild('modalC2') modalC2: TemplateRef<any>;
  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  @ViewChild('vc2', {read: ViewContainerRef}) vc2: ViewContainerRef;
  backdrop: any;
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrService,
    public Api: ApiService,
    private actRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sForm();
    this.key = this.actRouter.snapshot.paramMap.get('key');
    this.Api.GetForm(this.key).valueChanges().subscribe(data => {
      this.myForm.patchValue(data);
    });
    /* this.Api.GetCall(this.key).snapshotChanges().subscribe(re => {
      this.calls = [];
      re.forEach(item => {
        const call = item.payload.toJSON();
        call['$key'] = item.key;
        this.calls.push(call as Call);
      });
      if (this.calls) {
        this.folio = this.calls.length + 1;
      } else {
        this.folio = 1;
      }
    }); */
  }

  sForm() {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required]],
      domicilio: ['', [Validators.required]],
      tel: ['', [Validators.required]],
      fecha: [''],
      email: ['', [Validators.required]]
    });
  }

  ResetForm() {
    this.myForm.reset();
  }

  submitSurveyData = () => {
    this.Api.UpdateForm(this.myForm.value, this.key);
    this.toastr.success('Actualizado!');
  }
  estado = () => {
    const estado = this.myForm.get('estado').value;
    /* console.log(estado); */
    this.myForm.patchValue({estado: !estado});
    this.Api.UpdateForm(this.myForm.value, this.key);
    this.toastr.success('Actualizado!');
  }

  showDialog(){
    const view = this.modalC.createEmbeddedView(null);
    this.vc.insert(view);
    this.modalC.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modalC.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modalC.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  closeDialog = () => {
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }
  showDialog2(){
    const view = this.modalC2.createEmbeddedView(null);
    this.vc2.insert(view);
    this.modalC2.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modalC2.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modalC2.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV');
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  closeDialog2 = () => {
    this.vc2.clear();
    document.body.removeChild(this.backdrop);
  }
}
