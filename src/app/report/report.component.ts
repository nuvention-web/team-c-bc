import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { RepoService } from '../repo.service';
import { Repo } from '../repo';
import { Issue } from '../issue';
import { Commit } from '../commit';
import { Log } from '../log';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  logId: string;
  private logDoc: AngularFirestoreDocument<Log>;
  log: Log;

  repo: Repo;
  openIssues: Issue[];
  closedIssues: Issue[];
  commits: Commit[];

  constructor(
    private repoService: RepoService,
    private route: ActivatedRoute,
    private db: AngularFirestore) {
    this.logId = this.route.snapshot.paramMap.get('id');
    this.logDoc = this.db.doc<Log>(`logs/${this.logId}`);
    this.logDoc.valueChanges().subscribe(l => {
      this.log = l;
      this.getRepo();
    });
  }

  ngOnInit(): void {
    this.repo = new Repo();
  }

  getRepo() {
    this.getRepoInfo();
    this.getRepoIssues();
    this.getCommits();
  }

  getRepoInfo(): void {
    this.repoService.getRepo(this.log.owner, this.log.repo)
      .subscribe(repo => this.repo = repo);
  }

  getRepoIssues(): void {
    this.repoService.getOpenIssueEvents(this.log.owner, this.log.repo, this.log.from)
      .subscribe(issues => this.openIssues = issues);
    this.repoService.getClosedIssueEvents(this.log.owner, this.log.repo, this.log.from)
      .subscribe(issues => this.closedIssues = issues);
  }

  getCommits(): void {
    this.repoService.getCommits(this.log.owner, this.log.repo, this.log.from, this.log.to)
      .subscribe(commits => this.commits = commits);
  }

  getDateTimeString(date): string {
    return new Date(date).toLocaleString();
  }

  getDateString(date): string {
    return new Date(date).toLocaleDateString();
  }

  getDateRange(): String {
    return `${new Date(this.log.from).toDateString()} to ${new Date(this.log.to).toDateString()}`;
  }

  getShortSHA(sha): string {
    return sha.substr(0, 6);
  }

  inTimeRange(time): boolean {
    return new Date(time) < new Date(this.log.to);
  }

  sendEmail(): void {
    this.repoService.sendEmail(this.logId).toPromise().then(
      res => {
        console.log(res);
        console.log(`email succeed`);
      }
    );
  }
}
