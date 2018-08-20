Vue.component('Items',{
    template: `
    <section id="items">
      <h2 class="text-center text-uppercase text-secondary mb-0">Vinyls</h2>
      <hr class="star-dark mb-5">
      <div class="container">
        <div class="row">
          <div class="product-layout col-md-3 col-sm-6 col-xs-6" v-for="album in albums">
            <div class="product-thumb transition">
              <div class="image"><a href="#"><img v-bind:src="album.cover" v-bind:alt="album.title" v-bind:title="album.title" style="width:75%"/></a></div>
              <div class="caption">
                <h4><a href="#">{{ album.title }}</a></h4>
                <p class="artist">{{ album.artist }}</p>
                <p class="price">$ {{ displayTwoFloat(album.price) }}</p>
              </div>
              <div class="button-group" v-if="token !== null">
                <button type="button" class="btn btn-default" v-on:click="addToCart(album)"><i class="fa fa-shopping-cart"></i> Add To Cart</button>
                <button type="button" class="btn btn-danger" v-on:click="deleteItem(album._id)" v-if="isAdmin === 'true'">X</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    data: function(){
        return {
          isAdmin: localStorage.getItem('isAdmin'),
        }
    },
    methods: {
      displayTwoFloat: function(price){
        return price.toFixed(2)
      },
      addToCart(value){
        this.$emit('add-to-cart', value)
      },
      deleteItem(value){
        this.$emit('delete', value)
      },
    },
    props: ['token', 'albums'],
})
