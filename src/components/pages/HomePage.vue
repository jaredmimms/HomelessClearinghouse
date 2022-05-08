<template>
  <div id="home-page">
    <h1>Homeless Clearinghouse lists services for the homeless.</h1>
    <h2>Public Resources</h2>
    <h3>Food Stamps</h3>
    <div style="padding: 56.25% 0 0 0; position: relative">
      <iframe
        src="https://player.vimeo.com/video/702122329?h=a4cf49feb4&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        title="Food Stamps"
      ></iframe>
    </div>
    <h3>General Relief</h3>
    <div style="padding: 56.25% 0 0 0; position: relative">
      <iframe
        src="https://player.vimeo.com/video/702118928?h=9145f41705&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
        frameborder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        title="General Relief"
      ></iframe>
    </div>
    <component
      v-bind:is="script"
      src="https://player.vimeo.com/api/player.js"
      async
    ></component>
    <h2>Private Listings</h2>
    <show-featured v-bind:offers="offers"></show-featured>
  </div>
</template>

<script>
import ShowFeatured from "@/components/ShowFeatured.vue";
export default {
  props: {
    offers: {
      type: Array,
      default: null,
    },
  },
  components: {
    "show-featured": ShowFeatured,
  },
};
</script>

<style>
</style>