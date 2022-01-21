import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { TwoWaysPageComponent } from './two-ways-page/two-ways-page.component';
import { ObsPageComponent } from './obs-page/obs-page.component';
import { PasswordsPageComponent } from './passwords-page/passwords-page.component';
import { AboutPageComponent } from './about-page/about.page.component';
import { ContactDetailPageComponent } from './contact-detail-page/contact-detail-page.component';
import { FormPageComponent } from './form-page/form-page.component';
import { IsAuthorisedService } from './is-authorised.service';
import { TestsPageComponent } from './tests-page/tests-page.component';
import { AnimatePageComponent } from './animate-page/animate-page.component';
import { NotesComponent } from './notes/notes.component';

const routes: Routes = [
    { path: '', component: ContactPageComponent },
    { path: 'contacts', redirectTo: '' },
    { path: 'contacts/add', component: FormPageComponent },
    { path: 'contacts/:id', component: ContactDetailPageComponent },
    { path: 'twoWays', component: TwoWaysPageComponent },
    { path: 'observables', component: ObsPageComponent },
    { path: 'obs', component: ObsPageComponent },
    { path: 'passwords', component: PasswordsPageComponent },
    { path: 'tests', component: TestsPageComponent },
    { path: 'animate', component: AnimatePageComponent },
    { path: 'about', component: AboutPageComponent, canActivate: [IsAuthorisedService] },
    { path: 'notes', component: NotesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
