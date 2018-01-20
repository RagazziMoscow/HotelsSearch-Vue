const HOTELS = [{
  id: 7969942,
  name: 'Beautiful, best located apartment!',
  description: 'Im Herzen Berlins begrüßt dich diese moderne, helle und komplett eingerichtete 3 Zimmer Wohnung, mit Blick auf den Kreuzberger Spreewaldplatz und nur 200m zum Görlitzer Park.',
  price: 209,
  image: 'https://a1.muscache.com/im/pictures/109467913/296cdac4_original.jpg?aki_policy=x_medium'
}, {
  id: 4508183,
  name: 'Fantastic view in a superlocation',
  description: 'A peacefull oasis in the middle of the city, with fantastic view from balcony. The most highlights are in walking distance. Bus, subway, supermarkets, restaurants and cafes just at the corner(URL HIDDEN)',
  price: 104,
  image: 'https://a2.muscache.com/im/pictures/60695965/9cdada99_original.jpg?aki_policy=x_medium'
}, {
  id: 13501472,
  name: 'Nice and central in Berlin',
  description: 'Nice altbau apartment (complete renovated) nearby Mauerpark an Bernauer Straße. It is in the district of Berlin-Mitte, you can reach any atrraction of Berlin within less than 30 Minutes by subway tram or bycycle.',
  price: 117,
  image: 'https://a0.muscache.com/im/pictures/158207ca-75db-4f05-90ad-90519c227cf7.jpg?aki_policy=x_medium'
}, {
  id: 976856,
  name: 'living at checkpoint charlie',
  description: 'The apartment is in the former East of Berlin between Potsdamer Platz and Alexanderplatz. This part of town is a very attractive residential area and full of history and places to discover. The “Mitte” fashion district, dozens of good restaurants, bars, theatres and clubs are at the doorsteps.',
  price: 48,
  image: 'https://a1.muscache.com/im/pictures/16948729/687c16bc_original.jpg?aki_policy=x_medium'
}];

Vue.component('hotel-image', {
  props: ['src'],
  template: '<img class="hotel-image" :src="src">'
});

Vue.component('hotel-title', {
  props: ['name'],
  template: '<h3 class="hotel-title">{{ name }}</h3>'
});

Vue.component('hotel-description', {
  props: ['content'],
  template: '<p class="hotel-description">{{description}}</p>',
  data: function() {
    const description = (this.content.length > MAX_DESC_LENGTH)?
      this.content.substring(0, MAX_DESC_LENGTH) + '...' : this.content;
    
    return {
        description
    };
  }
});

Vue.component('hotel-book', {
  props: ['price', 'id'],
  template:
    '<div class="hotel-book">' +
    '<span class="hotel-price">{{ price }}</span>' +
    '<a v-bind:href="src" target="_blank" class="hotel-book-link">' +
    'Book now!' +
    '</a>' +
    '</div>',
  data: function() {
    return {
        src: '\'https://www.airbnb.com/rooms/\'' + this.id
    };
  }
});

Vue.component('hotel-component', {
  props: ['image', 'name', 'desc', 'price', 'id'],
  template: 
    '<div>' +
      '<hotel-image :src="image"></hotel-image>' +
      '<div class="hotel-body">' +
      '<hotel-title :name="name"></hotel-title>' +
      '<hotel-description :content="desc"></hotel-description>' +
      '<hotel-book :price="price" :id="id"></hotel-book>' +
      '</div>' +
    '</div>'
});

const MAX_DESC_LENGTH = 100;

var app = new Vue({
  el: "#root",
  data: {
    displayedHotels: HOTELS,
    searchQuery: ""
  },
  watch: {
    searchQuery: function(searchString) {
      const hotels = HOTELS.filter(function(hotel) {
        const templateString = hotel.name.toLowerCase() + hotel.description.toLowerCase();
        return (templateString.indexOf(searchString.toLowerCase()) !== -1);
      });
      this.displayedHotels = hotels;
    }
  }
});