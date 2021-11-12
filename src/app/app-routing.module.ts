import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact.page.component';
import { AboutPageComponent } from './about/about.page.component';
import { FormPageComponent } from './form/form.page.component';
import { TwoWaysComponent } from './two-ways/two-ways.component';

const routes: Routes = [
    { path: '', component: ContactPageComponent },
    { path: 'twoWays', component: TwoWaysComponent },
    { path: 'about', component: AboutPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
