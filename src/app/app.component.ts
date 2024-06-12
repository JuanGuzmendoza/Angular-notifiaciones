import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OneSignal } from 'onesignal-ngx';
import { KeyValue } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div *ngFor="let item of data | keyvalue">
      <div class="bg-white shadow-md rounded p-4 mb-4">
      <h2 class="text-lg font-bold">{{ item.value.headings && item.value.headings.en }}</h2>
      <p class="text-gray-600">{{ item.value.contents && item.value.contents.en }}</p>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css'],
  imports: [HttpClientModule, CommonModule, RouterOutlet]
})
export class AppComponent implements OnInit {
  data: { [key: string]: any } = {};

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private oneSignal: OneSignal
  ) {}

  ngOnInit(): void {
    this.http.get('https://api-medicina-abf75-default-rtdb.firebaseio.com/Data.json').subscribe(response => {
      this.data = response;
      console.log(this.data);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.oneSignal.init({
        appId: "7bb3c888-1958-46dc-b92b-1214692ed5b5",
      });
    }
  }
}