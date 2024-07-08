import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutes} from './app.routing';
import {AppComponent} from './app.component';
import {FullComponent} from './layouts/full/full.component';
import {AppHeaderComponent} from './layouts/full/header/header.component';
import {AppSidebarComponent} from './layouts/full/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DemoMaterialModule} from './demo-material-module';
import {SharedModule} from './shared/shared.module';
import {SpinnerComponent} from './shared/spinner.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ToastrModule} from 'ngx-toastr';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {AuthInterceptorService} from './services/auth-interceptor.service';
import {DatePipe} from "@angular/common";
import {locale, loadMessages} from 'devextreme/localization';
//import "devextreme-intl";
import * as trMessages from 'devextreme/localization/messages/tr.json';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SpinnerComponent,
  ],
  providers: [
    //{provide: LOCALE_ID, useValue: 'tr'},
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
    HttpClientModule,
    MatDialogModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    AppSidebarComponent,
    MatFormFieldModule,
  ]
})
export class AppModule {
  constructor() {
    locale('tr');
    loadMessages(trMessages);
  }
}
