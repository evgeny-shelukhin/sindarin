import { Component } from '@angular/core';
import { Http } from '@angular/http';
import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";
// Rxjs operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {

  public translation: Observable<string>;
  public term = new FormControl();

  constructor(private http: Http) {
    this.term.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .switchMap(
        term => this.getTranslation(term)
      )
      .subscribe(
        term => this.translation = term,
        err => this.logError(err)
      )
  }

  getTranslation(term: string) {
    const url: string = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170216T055322Z.5e8b7bc6ac559596.ed05e3dcb87e0d308ce2fefabb69fbf0e8f9b30e&text=${term}&lang=ru-en`;
    return this.http
      .get(url)
      .map(response => response.json().text);
  }

  logError(error) {
    console.error(error);
  }

}
