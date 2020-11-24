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
