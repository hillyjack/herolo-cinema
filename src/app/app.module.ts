import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PopUpDialogComponent } from './pop-up-dialog/pop-up-dialog.component';
import { AppMaterialModule } from './app-material/app-material.module';

@NgModule({
  entryComponents: [
    PopUpDialogComponent,
  ],
  declarations: [
    AppComponent,
    MoviesComponent,
    PopUpDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppMaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
