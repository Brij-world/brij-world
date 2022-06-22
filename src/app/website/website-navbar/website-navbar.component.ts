import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-navbar',
  templateUrl: './website-navbar.component.html',
  styleUrls: ['./website-navbar.component.css']
})
export class WebsiteNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showMenu() {
    var element = document.getElementById('show-mobile-menu');
    element.classList.add('show');
  }

  closeMenu(){
    var element = document.getElementById('show-mobile-menu');
    element.classList.remove('show');
  }

}
