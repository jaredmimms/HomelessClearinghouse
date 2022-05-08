<template>
  <div id="offers-page">
    <h2>Offers</h2>
    <div id="offers">
      <show-offer
        v-for="offer in offers"
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
    return {};
  },
};
</script>

<style scoped>
#offers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: center;
}
</style>
