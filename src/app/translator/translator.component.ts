import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css']
})
export class TranslatorComponent {

  constructor(private http: Http) {
  }

  translation;

  getTranslation(translationInput:string):Promise<string> {
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20170216T055322Z.5e8b7bc6ac559596.ed05e3dcb87e0d308ce2fefabb69fbf0e8f9b30e&text=' + translationInput + '&lang=ru-en';

    return this.http.get(url)
      .debounceTime(300)
      .toPromise()
      .then(response => {
        this.translation = response.json().text;
      })
      .catch(err => console.log(err));
  }

}
