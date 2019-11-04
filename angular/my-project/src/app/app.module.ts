import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {CommonUilibModule} from './common-uilib/common-uilib.module';
import {BooksComponent} from './books/books.component';
import {BookDetailComponent} from './book-detail/book-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MessagesComponent} from './messages/messages.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    MessagesComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonUilibModule,
    AppRoutingModule
  ],
  // 对象依赖注入
  providers: [],
  // 启动入口
  bootstrap: [AppComponent]
})
export class AppModule {
}
