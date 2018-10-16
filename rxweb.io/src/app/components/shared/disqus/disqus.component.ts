import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import * as moment from 'src/assets/scripts/moment.js'
import * as showdown from '../../../../assets/scripts/showdown.js'
import { FormBuilder } from "@angular/forms";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { Issue } from "src/app/components/shared/disqus/domain/issue.model";
import { HttpHeaders } from "@angular/common/http";
import { HttpErrorResponse } from "@angular/common/http";
import {catchError} from "rxjs/internal/operators";

@Component({
    selector: 'app-disqus',
    templateUrl: './disqus.component.html',
})

export class DisqusComponent implements OnInit {
    openIssuesList: any;
    closedIssuesList: any = [];
    activeTab: string = 'open';
    showComponent: boolean = false;
    converter = new showdown.Converter();
    issueFormGroup: FormGroup
    currentUrl: string;
    showSignIn: boolean = true;
    constructor(
        private http: HttpClient, location: Location, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            if (localStorage.getItem("token") == undefined && params.token != undefined) {
                localStorage.setItem("token", params.token);
            }
        })
    }

    ngOnInit(): void {
        if (localStorage.getItem("token") != undefined)
            this.showSignIn = false;
        let issueModel: Issue = new Issue();
        this.issueFormGroup = this.formBuilder.group(issueModel);
        this.currentUrl = this.router.url;
        let documentObj = document, scriptSection = documentObj.createElement('script'), newDateObj: any = new Date();
        scriptSection.src = 'https://rxweb.disqus.com/embed.js';
        scriptSection.setAttribute('data-timestamp', newDateObj);
        (documentObj.head || documentObj.body).appendChild(scriptSection);
        this.openIssues(true);
    }

    openIssues(fromInit: boolean) {
        this.openIssuesList = [];
        this.closedIssuesList = [];
        var url = 'https://api.github.com/repos/rxweb/rxweb/issues?state=open';
        if (location.pathname.split('/')[2])
            url += '&labels=validator:' + location.pathname.split('/')[2];
        this.http.get(url).subscribe((response: any[]) => {
            for (var i = 0; i < response.length; i++) {
                this.setIssueList(response[i], 'open');
            }
            if (fromInit)
                this.showComponent = true;
        })
    }

    closeIssues(fromInit: boolean) {
        this.openIssuesList = [];
        this.closedIssuesList = [];
        var url = 'https://api.github.com/repos/rxweb/rxweb/issues?state=closed';
        if (location.pathname.split('/')[2])
            url += '&labels=validator:' + location.pathname.split('/')[2];
        this.http.get(url).subscribe((response: any[]) => {
            for (var i = 0; i < response.length; i++) {
                this.setIssueList(response[i], 'close');
            }
        })
    }

    tabClick(activeTabName: string) {
        this.activeTab = activeTabName;
        if (activeTabName == 'open') {
            this.openIssues(false)
        }
        else {
            this.closeIssues(false);
        }
    }

    setIssueList(objectElement: any, type: string) {
        let item: any = {}
        item.comments_url = objectElement['comments_url'];
        item.title = objectElement['title'];
        item.number = objectElement['number'];
        item.html_url = objectElement['html_url'];
        item.body = this.converter.makeHtml(objectElement['body']);
        item.id = objectElement['id'];
        item.user = {};
        item.user.login = objectElement['user']['login'];
        item.user.html_url = objectElement['user']['html_url'];
        item.created_at = objectElement['created_at'];
        item.dayAgo = moment(objectElement['created_at']).fromNow();
        item.comments = {};
        item.isOpen = false;
        if (type == 'open')
            this.openIssuesList.push(item);
        else
            this.closedIssuesList.push(item);
    }

    showOpenComments(url, index) {
        if (this.openIssuesList[index]['isOpen']) {
            this.viewComments(url, index, true);
        }
        this.openIssuesList[index]['isOpen'] = !this.openIssuesList[index]['isOpen'];
    }

    showCloseComments(url, index) {
        if (this.closedIssuesList[index]['isOpen']) {
            this.viewComments(url, index, false);
        }
        this.closedIssuesList[index]['isOpen'] = !this.closedIssuesList[index]['isOpen'];
    }

    viewComments(url, index, isOpen) {
        this.http.get(url + "?client_id=a385a7486c35aa963216&client_secret=31e3c13354c3658471123d49181041eda80ece61").subscribe((response: any[]) => {
            let comments = [];
            for (let i = 0; i < response.length; i++) {
                comments.push(this.setCommentList(response[i]));
            }
            if (isOpen) {
                this.openIssuesList[index]['comments'] = comments;
            }
            else {
                this.closedIssuesList[index]['comments'] = comments;
            }
        });
    }

    setCommentList(objectElement: any) {
        let item: any = {}
        item.user = {};
        item.user.login = objectElement['login'];
        item.user.html_url = objectElement['html_url'];
        item.user.avatar_url = objectElement['avatar_url'];
        item.body = this.converter.makeHtml(objectElement['body']);
        item.created_at = objectElement['created_at'];
        item.dayAgo = moment(objectElement['created_at']).fromNow();
        return item;
    }

    addIssue() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                //'Authorization': 'token 593fb941e104abeb9aeca86d50b605a1d2a42a9f'
                'Authorization': 'token 7c3200a46735cf6215af0b5df2151fcb1acb5512' 
            })
        };
        //this.http.post("https://api.github.com/repos/rxweb/rxweb/issues", this.issueFormGroup.value, httpOptions).subscribe(response=>{
        this.http.post("https://api.github.com/repos/ishani778/testishani/issues", this.issueFormGroup.value, httpOptions).subscribe(response=>{
            console.log("issue created");
        },error=>{
            this.handleError(error);
        })
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
    };
}