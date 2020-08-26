import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavComponent } from "./components/nav/nav.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MatToolbarModule } from "@angular/material/toolbar";
import { ClockComponent } from "./components/clock/clock.component";
import { HomeComponent } from "./layouts/home/home.component";
import { TabsComponent } from "./components/tabs/tabs.component";
import { ButtonPlayComponent } from "./components/button-play/button-play.component";
import { MatIconModule, MatIcon } from "@angular/material/icon";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ModalComponent } from "./components/modal/modal.component";

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ClockComponent,
        HomeComponent,
        TabsComponent,
        ButtonPlayComponent,
        TaskListComponent,
        SettingsComponent,
        ModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
