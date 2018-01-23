import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SendGridTransport } from 'nodemailer-sendgrid-transport';

import { Repo } from './repo';
import { Issue } from './issue';
import { Commit } from './commit';
import { Response } from './response';


@Injectable()
export class RepoService {
  private static prefix = `https://api.github.com`;

  constructor(
    private http: HttpClient) { }

  public getRepo(userName, repoName): Observable<Repo> {
    return this.http.get<Repo>(`${RepoService.prefix}/repos/${userName}/${repoName}`);
  }

  public getOpenIssueEvents(userName, repoName, since_time): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${RepoService.prefix}/repos/${userName}/${repoName}` +
      `/issues?since=${new Date(since_time).toISOString()}&state=open`);
  }

  public getClosedIssueEvents(userName, repoName, since_time): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${RepoService.prefix}/repos/${userName}/${repoName}` +
      `/issues?since=${new Date(since_time).toISOString()}&state=closed`);
  }

  public getCommits(userName, repoName, since_time, to_time): Observable<Commit[]> {
    return this.http.get<Commit[]>(`${RepoService.prefix}/repos/${userName}/${repoName}` +
      `/commits?since=${new Date(since_time).toISOString()}&until=${new Date(to_time).toISOString()}`);
  }

  public sendEmail(logId): Observable<Response> {
    return this.http.get<Response>(`https://us-central1-github-weekly-summarizer.cloudfunctions.net/app/send-email?id=${logId}`);
  }
}
