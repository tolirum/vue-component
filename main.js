
Vue.component('product', {
	template: `
	<div class="product">
			<div class="product-image">
				<img :src="image" :alt="altText"/>
			</div>
			<div class="product-info">
				<h1>{{title}}</h1>
				<p v-if="inStock">In stock {{inStock}} pc</p>
				<p v-else :class="{outOfStock: !inStock}"
				>Out of stock {{inStock}} pc</p>
				<p>{{ sale }}</p>
				<a :href="link">More products like this</a>
				
				<product-details :details="details"></product-details>
				
				<div
					class="color-box" 
					v-for="(variant, index) in variants" 
					:key="variant.variantId"
					:style="{backgroundColor: variant.variantColor}"
					@mouseover="updateProduct(index)"
				>
				</div>
				
				<div>
					<div class="size" v-for="size in sizes"> {{size}} </div>
				</div>
				
				<p>User is Premium {{premium}}</p>
				<p>Shipping: {{ shipping }}</p>
				<div class="cart-buttons">
					<button 
						v-on:click="addToCart"
						:disabled="!inStock"
						:class="{disabledButton: !inStock}"
					>
					Add to cart
					</button>
					<button 
						@click="removeFromCart"
						:disabled="!cart"
						:class="{disabledButton: !cart}"
					>
					Remove from cart
					</button>
					<div class="cart">
						<p>Cart({{cart}})</p>
					</div>
				</div>
			</div>
		</div>
	`,
	props: {
		premium: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			product: 'Socks',
		brand: 'Vue Mastery',
		selectedVariant: 0,
		altText: 'A pair of socks',
		link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
		inventory: 50,
		onSale: 1,
		details: ['80% cotton', '20% polyester', 'gender-neutral'],
		variants: [
			{
				variantId: 2234,
				variantColor: 'green',
				variatImage: './assets/vmSocks-green-onWhite.jpg',
				variantQuantity: 15,
			},
			{
				variantId: 2235,
				variantColor: 'blue',
				variatImage: './assets/vmSocks-blue-onWhite.jpg',
				variantQuantity: 0,
			},
		],
		sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
		cart: 0,
		}
	},
	methods: {
		addToCart() {
			this.cart += 1;
		},
		removeFromCart() {
			if (this.cart > 0) {
				this.cart -= 1;
			}
			// this.cart > 0? this.cart -= 1: this.cart
		},
		updateProduct(index) {
			this.selectedVariant = index;
			console.log(index);
		},
	},
	computed: {
		title() {
			return this.brand + ' ' + this.product;
		},
		image() {
			return this.variants[this.selectedVariant].variatImage;
		},
		inStock() {
			return this.variants[this.selectedVariant].variantQuantity;
		},
		sale() {
			if (this.onSale) {
				return this.brand + ' ' + this.product + ' are on sale!';
			} else {
				return this.brand + ' ' + this.product + ' are not on sale';
			}
		},
		shipping() {
			if (this.premium) {
				return 'Free';
			} else {
				return 2.99;
			}
		},
	},
})

Vue.component('product-details', {
	props: {
		details: {
			type: Array,
			required: true,
		}
	},
	template:
	`
		<ul>
			<li v-for="detail in details">{{detail}}</li>
		</ul>
	`,
})


var app = new Vue({
	el: '#app',
	data: {
		premium: true,
		
	}
})