import { Component, OnInit } from '@angular/core';
import { environment } from '@environment/environment';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {
  redirectUrl: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.redirectUrl = environment.domain;
  }
}
