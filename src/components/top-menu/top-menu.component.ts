import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {

  @Input() allowSearch = true;

  get shoppingCartCount(): Observable<any> {
    return this.dataService.shoppingCart.pipe(
      take(1),
      map(a => a.length)
    );
  }

  constructor(
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {}

  openCart(): void {
    this.router.navigate(['/my-cart']);
  }

}
