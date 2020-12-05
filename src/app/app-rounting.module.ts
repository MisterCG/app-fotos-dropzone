import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosComponent } from './pages/fotos/fotos.component';
import { UploadComponent } from './pages/upload/upload.component';

const routes: Routes = [
  { path: 'fotos', component: FotosComponent },
  { path: 'upload', component: UploadComponent },
  { path: '**', redirectTo: '/fotos' }
]


@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRountingModule { }
