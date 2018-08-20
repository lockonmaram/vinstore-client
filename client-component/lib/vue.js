var app = new Vue({
  el: '#app',
  data: {
    albums: null,
    cart: [],
    artists: null,
    cartItems: null,
    totalAmount: 0,
    totalPrice: 0,

    userId: localStorage.getItem('id'),
    first_name: localStorage.getItem('first_name'),
    last_name: localStorage.getItem('last_name'),
    token: localStorage.getItem('authorization'),
    emailLogin: null,
    passwordLogin: null,
    isAdmin: localStorage.getItem('isAdmin'),

    image: null,
    title: null,
    price: null,
    artist: null,
  },
  methods: {
    displayTwoFloat: function(price){
      return price.toFixed(2)
    },
    handleFileUpload: function(img){
      this.image = img
      console.log('ini image',this.image);
    },
    addItem: function(value){
      event.preventDefault()
      let formData = new FormData()
      formData.append('image', this.image)
      console.log(formData);

      axios({
        method: 'post',
        url: 'https://vinstoreserver.lockonmaram.com/upload',
        data: formData,
      })
      .then(result=>{
        console.log(result.data.link);
        axios.post('https://vinstoreserver.lockonmaram.com/albums/add',{
          title: value.title,
          cover: result.data.link,
          price: value.price,
          artist: value.artist
        })
        .then(album=>{
          swal("Yeay", "New item has been submited!", "success")
          .then(ok=>{
            window.location.reload()
          })
        })
        .catch(err=>{
          swal("Failed!", "Item failed to input", "error");
        })
      })
      .catch(function(){
        swal("Failed!", "Your file has not been uploaded", "error");
      });
    },
    deleteItem: function(albumId){
      console.log(albumId);
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this item!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.delete('https://vinstoreserver.lockonmaram.com/albums/delete',{
            data:{
              albumId: albumId
            }
          })
          .then(result=>{
            console.log('----res',result);
            swal("Poof! Album has been deleted!", {
              icon: "success",
            })
            .then(ok=>{
              window.location.reload()
            })
          })
        } else {
          swal("Your album is safe!");
        }
      });
    },
    addToCart: function(album){
      album.quantity = 1
      this.cart.push(album)
      swal("Nice choice!", "Item added to cart", "success");
    },
    onCheckout: function(totalPrice){
      swal({
        title: "Checkout now?",
        text: `Total price: $${totalPrice}`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios.put('https://vinstoreserver.lockonmaram.com/users/addTransaction',{
            userId: this.userId,
            items: this.cart,
            token: this.token,
            totalPrice: totalPrice
          })
          .then(done=>{
            swal("Thank you for shopping with us! Have a nice day!", {
              icon: "success",
            });
            this.cart = []
          })
          .catch(err=>{
            swal("Something went wrong!", "please try again")
            this.cart = []
          })
        }
      });
    },
    getData: function(){
      // console.log('hoho');
      axios.get('https://vinstoreserver.lockonmaram.com/albums')
      .then(albums=>{
        // console.log(albums.data);
        this.albums = albums.data
        let artistArr = []
        for (let i = 0; i < albums.data.length; i++) {
          let listed = false
          for (let j = 0; j < artistArr.length; j++) {
            if (artistArr[j] === albums.data[i].artist) {
              listed = true
            }
          }
          if (listed === false) {
            artistArr.push(this.albums[i].artist)
          }
        }
        this.artists = artistArr
      })
    },
    login: function(value){
      event.preventDefault()

      axios.post('https://vinstoreserver.lockonmaram.com/users/login', {
        email: value.email,
        password: value.password
      })
      .then(res=>{
        if (res.data === 'wrong password') {
          swal("Wrong password!");
        }else if (res.data === 'email is not found') {
          swal("Email not found!")
        }else {
          // console.log('resasdfadsf',res);
          this.token = res.data.token
          this.userId = res.data.userId
          this.first_name = res.data.first_name
          this.last_name = res.data.last_name
          // console.log(this.userId);
          // console.log(this.token);
          localStorage.setItem('authorization', res.data.token);
          localStorage.setItem('id', res.data.userId);
          localStorage.setItem('first_name', res.data.first_name);
          localStorage.setItem('last_name', res.data.last_name);
          localStorage.setItem('isAdmin', res.data.isAdmin);
          swal("Yeay", "You are logged in!", "success")
          .then(ok=>{
            window.location.reload()
          })
        }
      })
    },
    logout: function(){
      // event.preventDefault()
      this.token = null
      this.userId = null
      this.first_name = null
      this.last_name = null
      this.isAdmin = null
      localStorage.clear();
      swal("You have logged out", "See you later!")
      .then(ok=>{
        window.location.reload()
      })
    },
    signUp: function(value){
      event.preventDefault()

      axios.post('https://vinstoreserver.lockonmaram.com/users/signup', {
        first_name: value.first_name,
        last_name: value.last_name,
        email: value.email,
        password: value.password
      })
      .then(res=>{
        // console.log(res.data);
        // console.log(this.token);
        localStorage.setItem('authorization', res.data.token);
        localStorage.setItem('id', res.data.userId);
        localStorage.setItem('first_name', res.data.first_name);
        localStorage.setItem('last_name', res.data.last_name);
        localStorage.setItem('isAdmin', res.data.isAdmin);
        swal("Yeay", "Thank you for signing up!", "success")
        .then(ok=>{
          window.location.reload()
        })
      })
    },
    filterArtist: function(artist){
      axios.post('https://vinstoreserver.lockonmaram.com/albums',{
        artist: artist
      })
      .then(albums=>{
        this.albums = albums.data
      })
    }
  },
  created(){
    this.getData()
  },
  computed: {
    cartDisplay: function(){
      let display = []
      for (let i = 0; i < this.cart.length; i++) {
        let listed = false
        for (let j = 0; j < display.length; j++) {
          if (display[j] === this.cart[i]) {
            listed = true
            display[j].quantity += 1
          }
        }
        if (listed === false) {
          display.push(this.cart[i])
        }
      }
      this.cartItems = display
      return display
    },
  },
  watch: {
    cart: function(){
      let totalPrice = 0
      let totalAmount = 0
      let display = []
      for (let i = 0; i < this.cart.length; i++) {
        let listed = false
        for (let j = 0; j < display.length; j++) {
          if (display[j] === this.cart[i]) {
            listed = true
            display[j].quantity += 1
          }
        }
        if (listed === false) {
          display.push(this.cart[i])
        }
      }
      this.cart.forEach(album =>{
        totalPrice += (album.price * album.quantity)
      })
      this.cart.forEach(album =>{
        totalAmount += album.quantity
      })
      this.totalPrice = totalPrice
      this.totalAmount = totalAmount
      this.cartItems = display
    }
  }
})
