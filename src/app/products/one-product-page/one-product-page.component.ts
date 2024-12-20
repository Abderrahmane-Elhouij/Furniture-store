import { Component, CUSTOM_ELEMENTS_SCHEMA, effect, inject, input } from '@angular/core';
import { MockDataService } from '../../services/mock-data.service';
import { faCubes, faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-one-product-page',
  imports: [FontAwesomeModule],
  standalone: true,
  templateUrl: './one-product-page.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OneProductPageComponent {
  private productsService = inject(MockDataService)
  private cartService = inject(CartService)

  totalItems = 0;
  source = 'oneproduct'

  currentView: 'image' | '3d' = 'image';
  quantity: number = 1;

  allProducts = this.productsService.getData();
  // testChair = this.allProducts.seatings.chairs[0];

  productId!: string;
  testChair: any; // Replace `any` with the actual product type if available
  faImage = faImage;
  fa3DModel = faCubes;

  constructor(private route: ActivatedRoute) {
    // effect(() => {
    //   this.sendData(); // Automatically send updated totalItems
    // });
  }

  sendData() {
    this.cartService.sendData(this.quantity, this.source); // Send data to the service
  }

  ngOnInit(): void {
    // Get the product ID from the route
    this.productId = this.route.snapshot.paramMap.get('id')!;
    console.log('Product ID:', this.productId);

    // Fetch the product using the ID
    this.testChair = this.productsService.getProductById(Number(this.productId));
    console.log('Fetched Product:', this.testChair);
  }


  toggleView() {
    this.currentView = this.currentView === 'image' ? '3d' : 'image';
    console.log(`Switched to ${this.currentView} view.`);
    console.log(this.testChair);

  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    this.testChair.quantity = this.quantity;
    this.cartService.addToCart(this.testChair);
    alert('Product added to cart!');
  }
}
