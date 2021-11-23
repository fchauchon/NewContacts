import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { AboutPageComponent } from './about/about.page.component';
import { FormPageComponent } from './form/form.page.component';
import { TwoWaysComponent } from './two-ways/two-ways.component';
import { ObservablesComponent } from './observables/observables.component';
import { PageObsComponent } from './page-obs/page-obs.component';

const routes: Routes = [
    { path: '', component: ContactPageComponent },
    { path: 'twoWays', component: TwoWaysComponent },
    { path: 'observables', component: ObservablesComponent },
    { path: 'obs', component: PageObsComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
