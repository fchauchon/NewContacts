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
import { MatDialogModule } from '@angular/material/dialog';

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
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactDetailPageComponent } from './contact-detail-page/contact-detail-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { TestsPageComponent } from './tests-page/tests-page.component';
import { TestsComponent } from './tests/tests.component';
import { AnimatePageComponent } from './animate-page/animate-page.component';
import { AnimateComponent } from './animate/animate.component';
import { NotesComponent } from './notes/notes.component';

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
    ContactDetailComponent,
    ContactDetailPageComponent,
    FormPageComponent,
    TestsPageComponent,
    TestsComponent,
    AnimatePageComponent,
    AnimateComponent,
    NotesComponent
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
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
