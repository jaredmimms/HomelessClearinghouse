import { createStore, createLogger } from 'vuex'
import { axios } from "@/common/app.js";

// Only load the createLogger plugin when in development mode
const debug = process.env.NODE_ENV !== 'production';
const plugins = debug && 1 == 2 ? [createLogger({})] : [];

export const store = createStore({
    plugins,
    state() {
        return {
            offers: [],
            user: null,
        }
    },
    // Methods used to alter the state of our store
    mutations: {
        setOffers(state, payload) {
            state.offers = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    // Methods that can contain async. code
    // Can not directly alter the state - has to change state
    // by committing mutations
    actions: {
        fetchOffers(context) {
            axios.get("offer").then((response) => {
                context.commit('setOffers', response.data.offers);
            });
        },
        authUser(context) {
            return new Promise((resolve) => {
                axios.post('auth').then((response) => {
                    if (response.data.authenticated) {
                        context.commit('setUser', response.data.user);
                    } else {
                        context.commit('setUser', false);
                    }

                    resolve();
                });
            });
        },
    },
    getters: {
        getOfferById(state) {
            return function (id) {
                return state.offers.filter((offer) => {
                    return offer.id == id;
                }, id)[0];
            }
        }
    }
})