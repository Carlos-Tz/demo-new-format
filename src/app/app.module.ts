import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { LoginComponent } from './admin/login/login.component';
import { NavbarComponent } from './admin/navbar/navbar.component';
import { NewRegisterComponent } from './admin/new-register/new-register.component';
import { PanelComponent } from './admin/panel/panel.component';
import { RegisterComponent } from './admin/register/register.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { Angular2SignaturepadModule } from 'angular2-signaturepad';
import { GaugeChartModule } from 'angular-gauge-chart';
import { CurrencyPipe } from '@angular/common';
//import { NgSelect2Module } from 'ng-select2';
import { Select2Module } from "ng-select2-component";


import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerComponent } from './admin/spinner/spinner.component';
import { EditRegisterComponent } from './admin/edit-register/edit-register.component';
import { BtnCallComponent } from './admin/edit-register/btn-call/btn-call.component';
import { NewCallComponent } from './admin/edit-register/new-call/new-call.component';
import { EditCallComponent } from './admin/edit-register/edit-call/edit-call.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from './admin/calendar/calendar.component';
import { NewCitaComponent } from './admin/new-cita/new-cita.component';
import { PhotosComponent } from './admin/photos/photos.component';
import { CasaComponent } from './admin/photos/casa/casa.component';
import { NewCasaComponent } from './admin/new-casa/new-casa.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { MainComponent } from './admin/main/main.component';
import { EditCasaComponent } from './admin/photos/edit-casa/edit-casa.component';
import { PrintCasaComponent } from './admin/photos/print-casa/print-casa.component';
import { ImgComponent } from './admin/photos/img/img.component';
import { ClientesComponent } from './admin/clientes/clientes.component';
import { NotasComponent } from './admin/notas/notas.component';
import { OrdenesComponent } from './admin/ordenes/ordenes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NewNotaComponent } from './admin/new-nota/new-nota.component';
import { NewOrdenComponent } from './admin/new-orden/new-orden.component';
import { EditOrdenComponent } from './admin/edit-orden/edit-orden.component';
import { EditNotaComponent } from './admin/edit-nota/edit-nota.component';
import { ProductosComponent } from './admin/productos/productos.component';
import { NewProductoComponent } from './admin/new-producto/new-producto.component';
import { EditProductoComponent } from './admin/edit-producto/edit-producto.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    LoginComponent,
    NavbarComponent,
    NewRegisterComponent,
    PanelComponent,
    RegisterComponent,
    VerifyEmailComponent,
    SpinnerComponent,
    EditRegisterComponent,
    BtnCallComponent,
    NewCallComponent,
    EditCallComponent,
    CalendarComponent,
    NewCitaComponent,
    PhotosComponent,
    CasaComponent,
    NewCasaComponent,
    MainComponent,
    EditCasaComponent,
    PrintCasaComponent,
    ImgComponent,
    ClientesComponent,
    NotasComponent,
    OrdenesComponent,
    NewNotaComponent,
    NewOrdenComponent,
    EditOrdenComponent,
    EditNotaComponent,
    ProductosComponent,
    NewProductoComponent,
    EditProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    ToastrModule.forRoot(),
    FullCalendarModule,
    Ng2ImgMaxModule,
    AngularFireStorageModule,
    MatDialogModule,
    Angular2SignaturepadModule,
    GaugeChartModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    Select2Module,
    //NgSelect2Module
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
