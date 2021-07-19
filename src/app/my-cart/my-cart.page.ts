import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService, ICartProduct } from '../data.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {

  get cartItems(): Observable<ICartProduct[]> {
    return this.dataService.shoppingCart;
  }

  constructor(
    public alertController: AlertController,
    private dataService: DataService) { }

  ngOnInit() {
  }

  add(product: ICartProduct): void {
    product.amount += 1;
  }

  async remove(product: ICartProduct): Promise<void> {
    if (product.amount > 1) {
      product.amount -= 1;
    } else {
      this.confirmRemoveProduct(product);
    }
  }

  private async confirmRemoveProduct(product: ICartProduct) {
    const alert = await this.alertController.create({
      header: 'Remove from cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Okay',
          handler: () => {
            this.dataService.removeProductFromCart(product);
          }
        }
      ]
    });

    await alert.present();
  }

}
