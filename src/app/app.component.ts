import {Component, OnInit} from '@angular/core';
import {fromEvent, Observable, of} from "rxjs";
import {share, takeWhile, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipieBook';

  loadedFeature = 'recipe';

  constructor(private http: HttpClient) {
    const source = of('janis');
    source.pipe(
      tap(value => value.toUpperCase())
    ).subscribe(t => console.log(t));
    const request = this.getPosts().subscribe(rec => console.log(rec));
    const source2 = fromEvent(document, 'click');
    let counter =0;
    source2
      .pipe(takeWhile(() => counter < 3))//take(3)
      .subscribe(() => {
        console.log('click', counter);
        counter++;
      });
  };
  // 00:20 #10 - of/from
  // 03:01 #9 - Map/Tap
  // 05:48 #8 - Share
  // 08:26 #7 - SwitchMap
  // 11:24 #6 - Debounce Time
  // 13:42 #5 - Distinct until changed
  // 14:50 #4 - Take, TakeUntil, TakeWhile, TakeLast
  // 19:56 #3 - MergeMap/FlatMap
  // 22:12 #2 - Concat
  // 23:43 #1 - ForkJoin

  ngOnInit(): void {
  };

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }

  getPosts(): Observable<Article[]> {
    return this.http.get<Article[]>('https://jsonplaceholder.typicode.com/posts').pipe(share());
  }
}

interface Article {
  id: number;
  title: string;
  body: string;
}
