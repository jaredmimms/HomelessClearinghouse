<template>
  <div>
    <nav>
      <ul>
        <li>
          <router-link
            v-for="link in links"
            v-bind:key="link"
            v-bind:to="paths[link]"
            >{{ link }}</router-link
          >
        </li>
      </ul>
    </nav>

    <router-view
      v-bind:offers="offers"
      v-on:update-offers="loadOffers"
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      links: ["home", "offers", "add an offer", "search", "tags", "admin"],
      paths: {
        home: "/",
        offers: "/offers",
        "add an offer": "/offer/new",
        search: "/search",
        tags: "/tags",
        admin: "/admin",
      },
    };
  },
  computed: {
    offers() {
      return this.$store.state.offers;
    },
  },
  mounted() {
    this.loadOffers();
  },
  methods: {
    loadOffers() {
      this.$store.dispatch("fetchOffers");
    },
  },
};
</script>

<style src='@/assets/css/hc.css'></style>
