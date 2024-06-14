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
  templateUrl: './app.component.html',
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
    this.http.get('https://api-medicina-abf75-default-rtdb.firebaseio.com/Data.json?_=' + new Date().getTime()).subscribe(response => {
      this.data = response;
      console.log("Conexion Exitosa")
    });

    if (isPlatformBrowser(this.platformId)) {
      this.oneSignal.init({
        appId: "7bb3c888-1958-46dc-b92b-1214692ed5b5",
      });
    }
  }

}