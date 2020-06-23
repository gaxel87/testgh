Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },

    template: `
    <div class="product">
            
    <div class="product-image">
        <img v-bind:src="image" v-bind:alt="altText"/>
    </div>    

    <div class="product-info">
        <h1>{{ title }}</h1>
        <h2 v-show="showDesc">{{ description }}</h2>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>
        <p>User is premium: {{ premium }}</p>

        <ul>
          <li v-for="detail in details">{{ detail }}</li>
        </ul>

        <!-- ":" ist die Kurzform von "v-bind:"" -->
        <!-- "@"" verhält sich wie "v-on:" -->  
        <div v-for="(variant, index) in variants" 
          :key="variant.variantId" 
          class="color-box"
          :style="{ backgroundColor: variant.variantColor }" 
          @mouseover="updateProduct(index)">                                  
        </div>

        <button v-on:click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">
          Add to cart
        </button>
        <div class="cart">
          <p>Cart ({{ cart }})</p>
        </div>
    </div>            

    </div>
    `,
    data() {
        return {        
        product: 'Socks',
        brand: 'Vue Mastery',
        description: 'Best quality in town',
        showDesc: false,
        selectedVariant: 0,
        altText: 'A pair of socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green.jpg",
                variantQuantity: 10
            },
            {
                variantId: 2235,
                variantColor: "blue",
                variantImage: "./assets/vmSocks-blue.jpg",
                variantQuantity: 0
            }
        ],
        cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1;
        },
        updateProduct(index) {
            this.selectedVariant = index;
            //console.log(index);
        }
    },
    // computed-Werte werden gecached
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }

})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }
})