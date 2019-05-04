import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ChatComponent} from './chat/chat.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
   {path: '', redirectTo: 'chat', pathMatch: 'full'},
   {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
   {path: 'login', component: LoginComponent},
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
