import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { AboutPageComponent } from './about/about.page.component';
import { FormPageComponent } from './form/form.page.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { TwoWaysComponent } from './two-ways/two-ways.component';
import { InterceptorService } from './services/interceptor.service';
import { ObservablesComponent } from './observables/observables.component';
import { ObsComponent } from './obs/obs.component';
import { ProducerComponent } from './producer/producer.component';
import { PageObsComponent } from './page-obs/page-obs.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactPageComponent,
    AboutPageComponent,
    FormPageComponent,
    ContactsListComponent,
    ContactComponent,
    TwoWaysComponent,
    ObservablesComponent,
    ObsComponent,
    ProducerComponent,
    PageObsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
