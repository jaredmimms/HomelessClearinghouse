<template>
  <div id="search-page">
    <h2>Offers Search</h2>
    <label for="search">Search: </label>
    <input type="text" v-model="search" id="search" />
    <div id="offers">
      <show-offer
        v-for="offer in searchOffers"
        v-bind:key="offer.id"
        v-bind:offer="offer"
      ></show-offer>
    </div>
  </div>
</template>

<script>
import ShowOffer from "@/components/ShowOffer.vue";

export default {
  components: {
    "show-offer": ShowOffer,
  },
  props: {
    offers: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  computed: {
    searchOffers() {
      var searchResults = [];
      var search = this.search;
      if (this.offers && search) {
        var searchTerm = new RegExp(search, "i");
        this.offers.forEach(function (offer) {
          if (
            offer.title.search(searchTerm) != -1 ||
            offer.content.search(searchTerm) != -1
          ) {
            searchResults.push(offer);
          }
        });
      }
      return searchResults;
    },
  },
};
</script>

<style scoped>
#posts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
</style>
