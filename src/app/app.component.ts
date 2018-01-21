import { Component, OnInit } from '@angular/core';
import { RepoService } from './repo.service';
import { Repo } from './repo';
import { Issue } from './issue';
import { Commit } from './commit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName = ``;
  repoName = ``;
  repo: Repo;
  openIssues: Issue[];
  closedIssues: Issue[];
  commits: Commit[];

  constructor(private repoService: RepoService) { }

  ngOnInit(): void {
    this.repo = new Repo();
  }

  getRepo() {
    this.getRepoInfo();
    this.getRepoIssues();
    this.getCommits();
  }

  getRepoInfo(): void {
    this.repoService.getRepo(this.userName, this.repoName)
      .subscribe(repo => this.repo = repo);
  }

  getRepoIssues(): void {
    this.repoService.getOpenIssueEvents(this.userName, this.repoName).subscribe(issues => this.openIssues = issues);
    this.repoService.getClosedIssueEvents(this.userName, this.repoName).subscribe(issues => this.closedIssues = issues);
  }

  getCommits(): void {
    this.repoService.getCommits(this.userName, this.repoName).subscribe(commits => this.commits = commits);
  }

  getDateTimeString(date): string {
    return new Date(date).toLocaleString();
  }

  getDateString(date): string {
    return new Date(date).toLocaleDateString();
  }

  getDateRange(): String {
    const one_day = 1000 * 60 * 60 * 24;
    return `${this.getDateString(new Date(new Date().getTime() - one_day * 7).getTime())} to ${this.getDateString(new Date().getTime())}`;
  }

  getShortSHA(sha): string {
    return sha.substr(0, 6);
  }
}
