<template>
  <div id="show-featured">
    <h2>Featured Offers</h2>
    <ul class="clean-list">
      <li v-for="offer in featuredOffers" v-bind:key="offer.id">
        <router-link v-bind:to="'/offer/' + offer.id">
          {{ offer.title }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: String,
    },
    offers: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {};
  },
  computed: {
    featuredOffers() {
      if (this.offers) {
        var offers = [];
        this.offers.forEach(function (offer) {
          if (Number(offer.featured)) {
            offers.push(offer);
          }
        });
        return offers;
      } else {
        return null;
      }
    },
  },
};
</script>

<style scoped>
#show-featured {
  background-color: var(--light-blue);
  border-radius: var(--radius);
  padding: 10px;
}
</style>
