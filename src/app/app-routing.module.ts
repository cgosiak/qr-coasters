import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForwardingComponent } from './forwarding/forwarding.component';

const routes: Routes = [
  {path: 'forward/:action/:data', component: ForwardingComponent},
  {path: 'forward/:action', component: ForwardingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
