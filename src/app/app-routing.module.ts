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
import { PointPageComponent } from './point-page/point-page.component';

const routes: Routes = [
    { path: '', redirectTo: "contacts", pathMatch: 'full' },
    { path: 'contacts', component: ContactPageComponent, title: "Liste des contacts" },
    { path: 'contacts/add', component: FormPageComponent, title: "Ajouter un contact" },
    { path: 'contacts/:id', component: ContactDetailPageComponent, title: 'Voir un contact' },
    { path: 'twoWays', component: TwoWaysPageComponent, title: 'Two-ways data binding' },
    { path: 'observables', component: ObsPageComponent, title: "Page dédiée aux Observables" },
    { path: 'passwords', component: PasswordsPageComponent, title: 'Saisie de password' },
    { path: 'tests', component: TestsPageComponent, title: 'Des tests' },
    { path: 'animate', component: AnimatePageComponent, title: 'Animations' },
    { path: 'about', component: AboutPageComponent, title: 'A propos', canActivate: [IsAuthorisedService] },
    { path: 'point', component: PointPageComponent, title: 'Canvas et point' },
    { path: 'notes', component: NotesComponent, title: 'Notes de l\'an dernier' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
