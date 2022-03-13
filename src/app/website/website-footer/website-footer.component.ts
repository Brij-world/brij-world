import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-footer',
  templateUrl: './website-footer.component.html',
  styleUrls: ['./website-footer.component.css']
})
export class WebsiteFooterComponent implements OnInit {
  date = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
