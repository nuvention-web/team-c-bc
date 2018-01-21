import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Repo } from './repo';
import { Issue } from './issue';
import { Commit } from './commit';


@Injectable()
export class RepoService {
  private static prefix = `https://api.github.com`;

  constructor(
    private http: HttpClient) { }

  public getRepo(userName, repoName): Observable<Repo> {
    return this.http.get<Repo>(`${RepoService.prefix}/repos/${userName}/${repoName}`);
  }

  public getOpenIssueEvents(userName, repoName): Observable<Issue[]> {
    const one_day = 1000 * 60 * 60 * 24;
    // https://api.github.com/repos/nuvention-web/team-c-bc/issues/events?since=2018-01-21T00:00:00Z&state=all
    const since_time = new Date(new Date().getTime() - one_day * 7).toISOString();
    return this.http.get<Issue[]>(`${RepoService.prefix}/repos/${userName}/${repoName}/issues?since=${since_time}&state=open`);
  }

  public getClosedIssueEvents(userName, repoName): Observable<Issue[]> {
    const one_day = 1000 * 60 * 60 * 24;
    const since_time = new Date(new Date().getTime() - one_day * 7).toISOString();
    return this.http.get<Issue[]>(`${RepoService.prefix}/repos/${userName}/${repoName}/issues?since=${since_time}&state=closed`);
  }

  public getCommits(userName, repoName): Observable<Commit[]> {
    const one_day = 1000 * 60 * 60 * 24;
    const since_time = new Date(new Date().getTime() - one_day * 7).toISOString();
    return this.http.get<Commit[]>(`${RepoService.prefix}/repos/${userName}/${repoName}/commits?since=${since_time}`);
  }
}
