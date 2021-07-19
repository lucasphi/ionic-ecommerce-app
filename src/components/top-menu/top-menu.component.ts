import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {

  get shoppingCartCount(): number {
    return 0;
  }

  constructor(dataService: DataService) { }

  ngOnInit() {}

}
