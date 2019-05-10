import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//////////////////////////////////////////////////
import { PageGroupComponent } from './page-group/page-group.component';
import { PageFileComponent } from './page-file/page-file.component';


const routes: Routes = [
  { path: '', redirectTo: 'file', pathMatch: 'full' },
  { path: 'group', component: PageGroupComponent },
  { path: 'file',  component: PageFileComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {useHash: true  }),
    ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
