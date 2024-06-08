import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreedDetailComponent } from './breed-detail/breed-detail.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'breed/:id', component: BreedDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
