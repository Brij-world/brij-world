import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServiceComponent } from './service/service.component';
import { ContactComponent } from './contact/contact.component';
import { WebsiteNavbarComponent } from './website-navbar/website-navbar.component';
import { QuickQuoteComponent } from './quick-quote/quick-quote.component';
import { RouterModule } from '@angular/router';
import { WebsiteSidemenuComponent } from './website-sidemenu/website-sidemenu.component';
import { WebsiteFooterComponent } from './website-footer/website-footer.component';
import { SolutionComponent } from './solution/solution.component';
import { NewsComponent } from './news/news.component';
import { WebsiteLoderComponent } from './website-loder/website-loder.component';
import { FaqComponent } from './faq/faq.component';

export const routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'solution', component: SolutionComponent },
  { path: 'faq', component: FaqComponent }

]


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ServiceComponent,
    ContactComponent,
    WebsiteNavbarComponent,
    QuickQuoteComponent,
    WebsiteSidemenuComponent,
    WebsiteFooterComponent,
    SolutionComponent,
    NewsComponent,
    WebsiteLoderComponent,
    FaqComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class WebsiteModule { }
