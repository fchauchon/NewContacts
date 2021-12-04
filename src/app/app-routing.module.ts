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

const routes: Routes = [
    { path: '', component: ContactPageComponent },
    { path: 'contact/:id', component: ContactDetailPageComponent },
    { path: 'add', component: FormPageComponent },
    { path: 'twoWays', component: TwoWaysPageComponent },
    { path: 'observables', component: ObsPageComponent },
    { path: 'obs', component: ObsPageComponent },
    { path: 'passwords', component: PasswordsPageComponent },
    { path: 'about', component: AboutPageComponent, canActivate: [IsAuthorisedService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
