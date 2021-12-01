import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { AboutPageComponent } from './about-page/about.page.component';
import { FormComponent } from './form/form.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactComponent } from './contact/contact.component';
import { TwoWaysComponent } from './two-ways/two-ways.component';
import { InterceptorService } from './services/interceptor.service';
import { ObservablesComponent } from './observables/observables.component';
import { ObsComponent } from './obs/obs.component';
import { ProducerComponent } from './producer/producer.component';
import { ObsPageComponent } from './obs-page/obs-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TwoWaysPageComponent } from './two-ways-page/two-ways-page.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContactPageComponent,
    AboutPageComponent,
    FormComponent,
    ContactsListComponent,
    ContactComponent,
    TwoWaysComponent,
    ObservablesComponent,
    ObsComponent,
    ProducerComponent,
    ObsPageComponent,
    TwoWaysPageComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
