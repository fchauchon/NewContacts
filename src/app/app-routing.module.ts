import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { AboutPageComponent } from './about-page/about.page.component';
import { ObservablesComponent } from './observables/observables.component';
import { ObsPageComponent } from './obs-page/obs-page.component';
import { TwoWaysPageComponent } from './two-ways-page/two-ways-page.component';
import { TwoPasswordsComponent } from './two-passwords/two-passwords.component';

const routes: Routes = [
    { path: '', component: ContactPageComponent },
    { path: 'twoWays', component: TwoWaysPageComponent },
    { path: 'observables', component: ObservablesComponent },
    { path: 'obs', component: ObsPageComponent },
    { path: 'passwords', component: TwoPasswordsComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
