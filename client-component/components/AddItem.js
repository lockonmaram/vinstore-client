Vue.component('item-add',{
    template: `
    <section id="add-item" v-if="isAdmin == 'true'">
      <div class="container">
        <h2 class="text-center text-uppercase text-secondary mb-0">Add Item</h2>
        <hr class="star-dark mb-5">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <form name="addItemForm" id="addItemForm" novalidate="novalidate">
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Title</label>
                  <input class="form-control" id="title-input" type="title" placeholder="Album title" required="required" data-validation-required-message="Input album title" v-model="title">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Cover</label>
                  <br>
                  <input type="file" id="file" ref="file" v-on:change="handleFileUpload($event.target.files[0])"/>
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Price</label>
                  <input class="form-control" id="price-input" type="price" placeholder="Album price" required="required" data-validation-required-message="Input album price" v-model="price">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <div class="control-group">
                <div class="form-group floating-label-form-group controls mb-0 pb-2">
                  <label>Artist</label>
                  <input class="form-control" id="artist-input" type="artist" placeholder="Album artist" required="required" data-validation-required-message="Input album artist" v-model="artist">
                  <p class="help-block text-danger"></p>
                </div>
              </div>
              <br>
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-xl" id="addItemButton" v-on:click="addItem">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>`,
    data: function(){
        return {
          isAdmin: localStorage.getItem('isAdmin'),
          title: '',
          price: '',
          artist: '',
        }
    },
    methods: {
      handleFileUpload(value){
        this.$emit('multer', value)
      },
      addItem(){
        this.$emit('item-add', {title: this.title, price: this.price, artist: this.artist})
      },
    },
})
