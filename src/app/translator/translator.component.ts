import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {

  constructor(private http: Http) {
  }

  public translation: string;

  getTranslation(translationInput: string): Subscription {
    const url: string = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170216T055322Z.5e8b7bc6ac559596.ed05e3dcb87e0d308ce2fefabb69fbf0e8f9b30e&text=${translationInput}&lang=ru-en`;

    return this.http
      .get(url)
      .map(response => response.json().text)
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(
        data => this.translation = data,
        error => this.logError(error)
      );
  }

  logError(error) {
    console.error(error);
  }

}
