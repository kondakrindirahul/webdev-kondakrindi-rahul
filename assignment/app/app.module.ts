import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent } from './components/test/test.component';
import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TestService } from './services/test.service.client';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { UserService } from "./services/user.service.client";
import { WebsiteEditComponent } from './components/website/website-edit/website-edit.component';
import { WebsiteNewComponent } from './components/website/website-new/website-new.component';
import { WebsiteListComponent } from './components/website/website-list/website-list.component';
import { WebsiteService } from "./services/website.service.client";
import { PageListComponent } from './components/page/page-list/page-list.component';
import { PageNewComponent } from './components/page/page-new/page-new.component';
import { PageEditComponent } from './components/page/page-edit/page-edit.component';
import { PageService } from "./services/page.service.client";
import { WidgetListComponent } from './components/widget/widget-list/widget-list.component';
import { WidgetEditComponent } from './components/widget/widget-edit/widget-edit.component';
import { WidgetChooserComponent } from './components/widget/widget-chooser/widget-chooser.component';
import { WidgetHeaderComponent } from './components/widget/widget-edit/widget-header/widget-header.component';
import { WidgetImageComponent } from './components/widget/widget-edit/widget-image/widget-image.component';
import { WidgetYoutubeComponent } from './components/widget/widget-edit/widget-youtube/widget-youtube.component';
import { WidgetService } from "./services/widget.service.client";
import { SafePipe } from "./components/widget/widget-list/safepipe";
import { WidgetHtmlComponent } from './components/widget/widget-edit/widget-html/widget-html.component';
import { WidgetTextComponent } from './components/widget/widget-edit/widget-text/widget-text.component';
import { QuillEditorModule } from 'ngx-quill-editor';
import { FlickrImageSearchComponent } from './components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component';
import { FlickrService } from "./services/flikr.service.client";
import { FitnesspalapiTestComponent } from './fitnesspalapi-test/fitnesspalapi-test.component';
import { FitnesspalServiceClient } from "./services/fitnesspal.service.client";
import { DisplayItemComponent } from './fitnesspalapi-test/display-item/display-item.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { ExerciseServiceClient } from "./services/exercise.service.client";
import { SharedServiceClient } from "./services/shared.service.client";
import { AuthenticationService } from "./services/authentication.service.client";
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { AdminServiceClient } from "./services/admin.service.client";

@NgModule({
  // Declare components here
  declarations: [
    AppComponent,
    HomeComponent,
    TestComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    WebsiteEditComponent,
    WebsiteNewComponent,
    WebsiteListComponent,
    PageListComponent,
    PageNewComponent,
    PageEditComponent,
    WidgetListComponent,
    WidgetEditComponent,
    WidgetChooserComponent,
    WidgetHeaderComponent,
    WidgetImageComponent,
    WidgetYoutubeComponent,
    SafePipe,
    WidgetHtmlComponent,
    WidgetTextComponent,
    FlickrImageSearchComponent,
    FitnesspalapiTestComponent,
    DisplayItemComponent,
    ExerciseComponent,
    AdminUserListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    QuillEditorModule,
    Routing
  ],
  // Client Side services here
  providers: [ TestService,
    UserService,
    WebsiteService,
    PageService,
    WidgetService,
    FlickrService,
    FitnesspalServiceClient,
    ExerciseServiceClient,
    SharedServiceClient,
    AuthenticationService,
    AdminServiceClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
