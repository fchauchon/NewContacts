import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from './services/interceptor.service';

import { AboutComponent } from './about/about.component';
import { AboutPageComponent } from './about-page/about.page.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { FormComponent } from './form/form.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ObsComponent } from './obs/obs.component';
import { ObsPageComponent } from './obs-page/obs-page.component';
import { PasswordsComponent } from './passwords/passwords.component';
import { PasswordsPageComponent } from './passwords-page/passwords-page.component';
import { ProducerComponent } from './producer/producer.component';
import { TwoWaysComponent } from './two-ways/two-ways.component';
import { TwoWaysPageComponent } from './two-ways-page/two-ways-page.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AboutComponent,
    AboutPageComponent,
    AppComponent,
    ContactComponent,
    ContactPageComponent,
    ContactsListComponent,
    FormComponent,
    FooterComponent,
    HeaderComponent,
    TwoWaysComponent,
    TwoWaysPageComponent,
    ObsComponent,
    ObsPageComponent,
    PasswordsComponent,
    PasswordsPageComponent,
    ProducerComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
