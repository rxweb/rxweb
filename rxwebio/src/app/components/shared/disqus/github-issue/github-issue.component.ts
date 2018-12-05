import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Location } from '@angular/common';
import * as moment from 'src/assets/scripts/moment.js'
import * as showdown from 'src/assets/scripts/showdown.js'

@Component({
    selector: 'app-github-issue',
    templateUrl: './github-issue.component.html',
})

export class GitHubIssueComponent implements OnInit {
    openIssuesList: any;
    closedIssuesList: any = [];
    activeTab: string = 'open';
    showComponent: boolean = false;
    converter = new showdown.Converter();
    constructor(
        private http: HttpClient, location: Location
    ) {
    }

    ngOnInit(): void {
        this.openIssues(true);
    }

    openIssues(fromInit: boolean) {
        this.openIssuesList = [];
        this.closedIssuesList = [];
        var url = 'https://api.github.com/repos/rxweb/rxweb/issues?state=open';
        if (location.pathname.split('/')[2])
            url += '&labels=' + location.pathname.split('/')[2];
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
            url += '&labels=' + location.pathname.split('/')[2];

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
        item.comments = [];
        item.isOpen = false;
        if (type == 'open')
            this.openIssuesList.push(item);
        else
            this.closedIssuesList.push(item);
    }

    showOpenComments(url, index) {
        this.openIssuesList[index]['isOpen'] = !this.openIssuesList[index]['isOpen'];
        if (this.openIssuesList[index]['isOpen']) {
            this.viewComments(url, index, true);
        }
        
    }

    showCloseComments(url, index) {
        this.closedIssuesList[index]['isOpen'] = !this.closedIssuesList[index]['isOpen'];
        if (this.closedIssuesList[index]['isOpen']) {
            this.viewComments(url, index, false);
        }
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
        item.user.login = objectElement.user['login'];
        item.user.html_url = objectElement.user['html_url'];
        item.user.avatar_url = objectElement.user['avatar_url'];
        item.body = this.converter.makeHtml(objectElement['body']);
        item.created_at = objectElement['created_at'];
        item.dayAgo = moment(objectElement['created_at']).fromNow();
        return item;
    }
}