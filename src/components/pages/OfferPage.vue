<template>
  <div id="offer-page">
    <p>
      Email <a href="mailto: jaredmimms@gmail.com">jaredmimms@gmail.com</a> with
      id number of offering and justification for services to acquire offer for
      (a) homeless individual(s).
    </p>
    <div v-if="offer">
      <h1>Offer: {{ id }}</h1>
      <div class="title">{{ offer.title }}</div>

      <div class="content">{{ offer.content }}</div>
      <div v-if="updated">
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
        <input
          type="text"
          v-model="offer.tags"
          id="tags"
          v-on:blur="validate"
        />
        <div v-if="errors && errors.tags" class="error">
          <li v-for="(item, index) in errors.tags" v-bind:key="index">
            {{ item }}
          </li>
        </div>
      </div>

      <button v-if="!updated && user" v-on:click="updated = true">
        Update
      </button>
      <button v-if="updated && user" v-on:click="update">Update</button>
      <button
        v-if="updated"
        v-on:click="
          updated = false;
          success = false;
          failure = false;
        "
      >
        Cancel
      </button>
      <div v-if="success" class="success">Post successfully updated</div>
      <div v-if="failure && errors" class="error">Error updating post</div>
    </div>
    <div v-else>
      <h2>Post {{ id }} not found</h2>
    </div>

    <div v-if="user">
      <button v-on:click="deleted">Delete</button>
    </div>

    <div v-if="previousOffer">
      <router-link v-bind:to="'/offer/' + previousOffer.id">
        <button id="previous">Previous</button>
      </router-link>
    </div>

    <div v-if="nextOffer">
      <router-link v-bind:to="'/offer/' + nextOffer.id">
        <button id="next">Next</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { axios } from "@/common/app.js";
import Validator from "validatorjs";
import { router } from "@/common/router.js";

export default {
  props: {
    id: {
      type: String,
    },
    offers: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      updated: false,
      failure: false,
      success: false,
      errors: [],
    };
  },
  methods: {
    update() {
      if (this.validate()) {
        var definedOffer = this.offer;
        if (definedOffer.featured) {
          definedOffer.featured = 1;
        } else {
          definedOffer.featured = 0;
        }
        axios
          .put("/offerput/" + this.offer.id, { offer: definedOffer })
          .then((response) => {
            if (response.data && response.data.errors) {
              this.failure = true;
              this.success = false;
              // continue from here with errors
              this.errors = response.data.errors;
            } else {
              this.errors = null;
              this.success = true;
              this.failure = false;
              this.$emit("update-offers");
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
    deleted() {
      axios.delete("/offerdelete/" + this.offer.id).then((response) => {
        if (response.data && response.data.errors) {
          this.failure = true;
          this.success = false;
          // continue from here with errors
          this.errors = response.data.errors;
        } else {
          this.errors = null;
          this.success = true;
          this.failure = false;
          this.$emit("update-offers");
          router.push("/offers");
        }
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    nextOffer() {
      var offered;
      if (this.offers && this.offer) {
        var id = this.offer.id;
        this.offers.forEach(function (offer, index, offers) {
          if (id == offer.id) {
            if (offers[index + 1]) {
              offered = offers[index + 1];
            } else if (offers.length > 1) {
              offered = offers[0];
            }
          }
        });
      }
      return offered;
    },
    previousOffer() {
      var offered;
      if (this.offers && this.offer) {
        var id = this.offer.id;
        this.offers.forEach(function (offer, index, offers) {
          if (id == offer.id) {
            if (offers[index - 1]) {
              offered = offers[index - 1];
            } else if (offers.length > 1) {
              offered = offers[offers.length - 1];
            }
          }
        });
      }
      return offered;
    },
    offer() {
      if (this.offers) {
        var offer;
        var id = this.id;
        this.offers.forEach(function (offered) {
          if (offered.id == id) {
            offer = offered;
          }
        });
        if (offer) {
          if (Number(offer.featured) == 1) {
            offer.featured = true;
          } else {
            offer.featured = false;
          }
        }
        return offer;
      } else {
        return null;
      }
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
}

input,
label,
textarea,
button {
  display: block;
  float: left;
  clear: both;
}

#product-page {
  border: 1px solid var(--silver);
  text-align: center;
  padding: 15px;
  margin-left: auto;
  margin-right: auto;
  width: 30%;
  min-width: 300px;
}

.title {
  height: 50px;
  font-size: 2rem;
  margin: 5px 0 10px 0;
  vertical-align: baseline;
}

.content {
  margin: auto;
  text-align: left;
  font-style: italic;
  line-height: 1.5;
}
</style>