import { NavigationExtras } from "@angular/router";

export interface ExtendNavigationExtras extends NavigationExtras {
    params?: any[]
}