import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouteCreateFormComponent } from './route-create-form/route-create-form.component';
import { RoutesTableComponent } from './routes-table/routes-table.component';
import { MaterialBlockModule } from './shared/material-block.module';
import { RouteRepositoryService } from './shared/repository/route-repository.service';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { RouteEditorDialogComponent } from './routes-table/route-editor-dialog/route-editor-dialog.component';
import { InternalServerErrorInterceptorService } from './shared/service/internal-server-error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RouteCreateFormComponent,
    RoutesTableComponent,
    TitleBarComponent,
    RouteEditorDialogComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialBlockModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    RouteRepositoryService,
    InternalServerErrorInterceptorService,
    { provide: HTTP_INTERCEPTORS, useClass: InternalServerErrorInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
