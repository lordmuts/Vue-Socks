Vue.component('product', {
    template: `
    <div class="product">

             <div class="product-image">
                <img v-bind:src="image">
            </div>

            <div class="product-info">
              <h1>{{ title }}</h1>
              <p v-if="inStock">In Stock</p>
              <p v-if="!inStock">Out of Stock (sorry)</p>
            
              <p>{{ sale }}</p>

              <ul>
                  <li v-for="detail in details">{{ detail }}</li>
              </ul>

              <div class="color-box"
              v-for="(variant, index) in variants" 
              :key="variant.variantId"
              :style="{ backgroundColor: variant.variantColor }"
              @mouseover="updateProduct(index)"
              >
              </div>

              <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
                <button v-on:click=addToCart
                        :disabled="!inStock"
                        :class="{disabledButton: !inStock }">Add to Cart</button>
                <button v-on:click=clearCart>Clear Cart</button>
                <button v-on:click=removeFromCart>Remove</button>
            </div>

            <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
          <li v-for="review in reviews">
          <p>Name: {{ review.name }}</p>
          <p>Rating: {{ review.rating }}</p>
          <p>Revieuw: {{ review.review }}</p>
          </li>
        </ul>
       </div>

            <product-review @review-submitted="addReview"></product-review>
            

        </div>
    `,



    data() {
        return {
            brand: 'Vue',
            product: 'socks',
            selectedVariant: 0,
            saleOn: false,
            details: ["80% cotton", "20% poyester", "Gender-neutral"],
            variants: [ 
                {
                    variantId: 1234,
                    variantColor: "green",
                    variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg",
                    variantQantity: 10,
                    OnSale: true 
                },
                {
    
                    variantId: 4567,
                    variantColor: "blue",
                    variantImage: "https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg",
                    variantQantity: 0,
                    OnSale: false
                }
    
            ],
            sizes: ["S","M","L","XL"],
            reviews:[]
        
        }
    },
    
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        clearCart() {
            this.$emit('clear-cart')
        },
        removeFromCart() {
            this.$emit('remove-from-cart')
        },
        updateProduct(index) {
            this.selectedVariant= index
            console.log(index)
        },
        addReview(productReview) {
            this.reviews.push(productReview)
        }

      
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQantity
        },
        sale() {
           if (this.variants[this.selectedVariant].OnSale) {
               return "BUY NOW!! THEY ARE ON SALE"
           }
        },
        
    }
})

Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Oh this is strange?!? It seems you forgot something</b>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </p>

    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    </p>

    <p>
        <input type="submit" value="versturen">
    </p>

    `,
    data() {
        return {
            name: null,
            rating: null,
            review: null,
            errors: [],
            
        }
    },
    methods: {
    onSubmit() {
        if(this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                } 
                this.$emit('review-submitted', productReview),
                this.name = null,
                this.review = null,
                this.ratign = null
            }
            else {
                if(!this.name || !this.review || !this.rating) {
                    this.errors.push("")
                }
            }
        }
    }
})

Vue.config.devtools = true;
    var app = new Vue({
        el: '#app',
        data: {
            cart: []
        },
        methods: {
            updateCart(id) {
                this.cart.push(id)
            },
            clearCart() {
                this.cart = []
            },
            removeFromCart() {
                this.cart.pop()
            }
        }
})