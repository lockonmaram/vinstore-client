Vue.component('Headr',{
    template: `
    <div class="container">
      <div class="jumbotron">
        <div class="container text-center">
          <div class="jumbo-text">
            <h1>VinStore</h1>
            <p>Complete your vinyl collection now!</p>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" v-on:click="getDataChild()" href="#">VinStore</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item" v-if="token === null">
              <a class="nav-link" v-on:click="getDataChild()" href="#">Home</a>
            </li>
            <li class="nav-item" v-if="token !== null">
              <a class="nav-link" v-on:click="getDataChild()" href="#">{{last_name}}</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="artistDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Artists
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" v-for="artist in artists" v-on:click="filterArtistChild(artist)" href="#">{{ artist }}</a>
              </div>
            </li>
            <li class="nav-item" v-if="token !== null">
              <a class="nav-link" v-on:click="logoutChild()" href="#">Logout</a>
            </li>
            <li class="nav-item" v-if="token === null">
              <a class="nav-link" href="#login">Login</a>
            </li>
          </ul>
          <div class="dropdown">
            <button type="button" class="btn btn-info" data-toggle="dropdown">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> Cart <span classwatch="badge badge-pill badge-danger">{{ totalAmount }}</span>
            </button>
            <div class="dropdown-menu">
              <div class="row total-header-section">
                <div class="col-lg-6 col-sm-6 col-6">
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i> <span class="badge badge-pill badge-danger">{{ totalAmount }}</span>
                </div>
                <div class="col-lg-6 col-sm-6 col-6 total-section text-right">
                  <p>Total: <span class="text-info">$ {{ displayTwoFloat(totalPrice) }}</span></p>
                </div>
              </div>
              <div class="row cart-detail" v-for="album in cartItems">
                <div class="col-lg-4 col-sm-4 col-4 cart-detail-img">
                  <img v-bind:src="album.cover">
                </div>
                <div class="col-lg-8 col-sm-8 col-8 cart-detail-product">
                  <p>{{ album.title }}</p>
                  <span class="price text-info">$ {{ displayTwoFloat(album.price) }}</span> <span class="count"> Quantity:{{ album.quantity }}</span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12 col-sm-12 col-12 text-center checkout">
                  <button class="btn btn-primary btn-block checkout-button" v-on:click="onCheckoutChild(displayTwoFloat(totalPrice))">Checkout</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>`,
    methods: {
        logoutChild(){
          event.preventDefault()
          this.$emit('logout-click')
        },
        getDataChild(){
          this.$emit('get')
        },
        filterArtistChild(value){
          this.$emit('filter', value)
        },
        onCheckoutChild(value){
          this.$emit('checkout', value)
        },
        cartDisplay(){
          this.$emit('display')
        },
        displayTwoFloat: function(price){
          return price.toFixed(2)
        },
    },
    props: ['token', 'last_name', 'artists', 'image', 'title', 'price', 'artist', 'cart', 'cartItems', 'totalAmount', 'totalPrice']
})
