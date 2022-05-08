<template>
  <div id="categories-page">
    <h2>Tags</h2>

    <button v-if="offerArray[0]" v-on:click="cancel" class="btn btn-primary">
      Cancel
    </button>

    <show-offer
      v-for="offer in offerArray"
      v-bind:key="offer.id"
      v-bind:offer="offer"
    ></show-offer>

    <ul v-if="!offerArray[0]" class="clean-list">
      <li v-for="(category, id) in categories" v-bind:key="id">
        <button
          v-on:click="showCategory(category.offerArray)"
          class="btn btn-primary"
        >
          {{ category.item }}
        </button>
      </li>
    </ul>
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
      offerArray: [],
    };
  },
  methods: {
    showCategory(offerArray) {
      this.offerArray = offerArray;
    },
    cancel() {
      this.offerArray = [];
    },
  },
  computed: {
    categories() {
      var offered = [];
      if (this.offers) {
        let categories = this.offers.map(function (offer) {
          if (offer.tags) {
            return offer.tags.split(",");
          }
        });
        let mergedCategories = [].concat.apply([], categories);

        // Return unique, sorted categories
        let item = [...new Set(mergedCategories)].sort();
        var offerss = this.offers;
        item.forEach(function (itemed) {
          var allOffers = [];
          offerss.forEach(function (offered) {
            if (offered.tags) {
              var itemArray = offered.tags.split(",");
              itemArray.forEach(function (itemd) {
                if (itemd == itemed) {
                  allOffers.push(offered);
                }
              });
            }
          });
          if (allOffers[0]) {
            offered.push({ item: itemed, offerArray: allOffers });
          }
        });
      }
      return offered;
    },
  },
};
</script>

<style>
</style>