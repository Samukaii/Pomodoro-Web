import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatToolbarModule } from "@angular/material/toolbar";
import { ClockComponent } from './components/clock/clock.component';
import { HomeComponent } from './layouts/home/home.component';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
    declarations: [AppComponent, NavComponent, ClockComponent, HomeComponent, TabsComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
