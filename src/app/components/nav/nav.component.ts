import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-nav",
    templateUrl: "./nav.component.html",
    styleUrls: ["./nav.component.css"],
})
export class NavComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}

    showDropDown = (dropdown: HTMLElement) => {
        let style = dropdown.style;
        style.display = style.display === "flex" ? "none" : "flex";
        console.log(style.display);
    };
}
