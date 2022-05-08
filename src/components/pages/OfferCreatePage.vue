<template>
  <div>
    <h2>Add an Offer</h2>

    <div id="inputs">
      <label for="title">Title</label>
      <input
        type="text"
        v-model="offer.title"
        id="title"
        v-on:blur="validate"
      />
      <div v-if="errors && errors.title" class="error">
        <li v-for="(item, index) in errors.title" v-bind:key="index">
          {{ item }}
        </li>
      </div>

      <label for="featured" class="form-checkbox-label">
        <input type="checkbox" v-model="offer.featured" id="featured" />
        Featured?
      </label>

      <label for="content">Content</label>
      <textarea
        v-model="offer.content"
        id="content"
        v-on:blur="validate"
      ></textarea>
      <div v-if="errors && errors.content" class="error">
        <li v-for="(item, index) in errors.content" v-bind:key="index">
          {{ item }}
        </li>
      </div>

      <label for="tags">Tags (separated by comma)</label>
      <input type="text" v-model="offer.tags" id="tags" v-on:blur="validate" />
      <div v-if="errors && errors.tags" class="error">
        <li v-for="(item, index) in errors.tags" v-bind:key="index">
          {{ item }}
        </li>
      </div>
    </div>

    <button v-on:click="addOffer" id="addOffer" class="btn btn-primary">
      Add Offer
    </button>
    <div v-if="success" class="success">Offer successfully added</div>
    <div v-if="failure && errors" class="error">Error adding offer</div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";
import Validator from "validatorjs";
import { router } from "@/common/router.js";

export default {
  data() {
    return {
      offer: {
        title: "Lorem ipsum",
        featured: false,
        tags: "lorem",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      errors: null,
      success: false,
      failure: false,
    };
  },
  methods: {
    addOffer() {
      if (this.validate()) {
        var editedOffer = this.offer;
        if (editedOffer.featured) {
          editedOffer.featured = 1;
        } else {
          editedOffer.featured = 0;
        }
        axios.post("/offer", { offer: editedOffer }).then((response) => {
          if (response.data && response.data.errors) {
            this.failure = true;
            this.success = false;
            // continue from here with errors
            this.errors = response.data.errors;
          } else {
            this.offer = {};
            this.errors = null;
            this.success = true;
            this.failure = false;
            this.$emit("update-offers");
            router.push("/offer/" + response.data.offer.id);
          }
        });
      }
    },
    validate() {
      let validator = new Validator(this.offer, {
        title: "required|between:3,100",
        tags: "required|between:3,100",
        content: "required|min:100",
      });

      if (validator.fails()) {
        this.errors = validator.errors.all();
      } else {
        this.errors = null;
      }

      return validator.passes();
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
.success {
  color: green;
}
#inputs {
  text-align: left;
  padding-left: 2em;
}
#addOffer {
  text-align: left;
  display: block;
  margin-top: 1em;
  margin-left: 3.3em;
}
input,
label {
  display: block;
}
</style>