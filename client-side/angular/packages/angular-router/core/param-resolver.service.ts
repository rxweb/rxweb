import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Injectable()
export class ParamResolver{
    constructor(public activatedRoute: ActivatedRoute, public router: Router) { }
}