import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from '@angular/core';
import { TestComponent } from './components/test/test.component';


import { LoginComponent } from "./components/user/login/login.component";
import { RegisterComponent } from "./components/user/register/register.component";
import { ProfileComponent } from "./components/user/profile/profile.component";
import { WebsiteListComponent } from "./components/website/website-list/website-list.component";
import { WebsiteEditComponent } from "./components/website/website-edit/website-edit.component";
import { WebsiteNewComponent} from "./components/website/website-new/website-new.component";
import { PageNewComponent } from "./components/page/page-new/page-new.component";
import { PageEditComponent } from "./components/page/page-edit/page-edit.component";
import { PageListComponent } from "./components/page/page-list/page-list.component";
import { WidgetListComponent } from "./components/widget/widget-list/widget-list.component";
import { WidgetEditComponent } from "./components/widget/widget-edit/widget-edit.component";
import { WidgetChooserComponent } from "./components/widget/widget-chooser/widget-chooser.component";
import { WidgetYoutubeComponent } from "./components/widget/widget-edit/widget-youtube/widget-youtube.component";
import { WidgetImageComponent } from "./components/widget/widget-edit/widget-image/widget-image.component";
import { WidgetHeaderComponent } from "./components/widget/widget-edit/widget-header/widget-header.component";
import { WidgetHtmlComponent } from "./components/widget/widget-edit/widget-html/widget-html.component";
import { WidgetTextComponent } from "./components/widget/widget-edit/widget-text/widget-text.component";
import { FlickrImageSearchComponent } from "./components/widget/widget-edit/widget-image/flickr-image-search/flickr-image-search.component";
import { FitnesspalapiTestComponent } from "./fitnesspalapi-test/fitnesspalapi-test.component";
import { DisplayItemComponent } from "./fitnesspalapi-test/display-item/display-item.component";
import { ExerciseComponent } from "./exercise/exercise.component";
import { AuthenticationService } from "./services/authentication.service.client";
import { AdminUserListComponent } from "./components/admin-user-list/admin-user-list.component";
import { AdminServiceClient } from "./services/admin.service.client";

const APP_ROUTES: Routes = [
  {path: '', component : HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'admin/user', component: AdminUserListComponent, canActivate: [AdminServiceClient] },
  {path: 'login', component: LoginComponent},
  {path: 'fitness', component: FitnesspalapiTestComponent},
  {path: 'fitness/item', component: DisplayItemComponent},
  {path: 'exercise', component: ExerciseComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: ProfileComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId', component: ProfileComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website', component: WebsiteListComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/new', component: WebsiteNewComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid', component: WebsiteEditComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page', component: PageListComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/new', component: PageNewComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid', component: PageEditComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget', component: WidgetListComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new', component: WidgetChooserComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/header', component: WidgetHeaderComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/image', component: WidgetImageComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/image/flickr', component: FlickrImageSearchComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/youtube', component: WidgetYoutubeComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/html', component: WidgetHtmlComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/new/text', component: WidgetTextComponent, canActivate: [AuthenticationService] },
  {path: 'user/:userId/website/:wid/page/:pid/widget/:wgid', component: WidgetEditComponent, canActivate: [AuthenticationService] }

];

// Export the routes as module providers
export const Routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
