import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { RepoService } from './repo.service';
import { Repo } from './repo';
import { Issue } from './issue';
import { Commit } from './commit';
import { Log } from './log';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  userName = ``;
  repoName = ``;

  logId: string;

  private logsCollection: AngularFirestoreCollection<Log>;
  logs: Observable<Log[]>;

  constructor(
    private repoService: RepoService,
    private db: AngularFirestore,
    private router: Router) {
    this.logsCollection = db.collection<Log>('logs');
    this.logs = this.logsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  registerRepo(): void {
    const one_day = 1000 * 60 * 60 * 24;
    const log = {
      owner: `${this.userName}`,
      repo: `${this.repoName}`,
      to: new Date().getTime(),
      from: new Date(new Date().getTime() - one_day * 7).getTime()
    };
    this.logsCollection.add(log).then(result => {
      this.logId = result.id;
      this.router.navigate([`/r/${this.logId}`]);
    });
  }
}
