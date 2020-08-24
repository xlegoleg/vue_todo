import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from "firebase";

Vue.use(Vuex);

const store = new Vuex.Store({

    state: {
        loader: false,
        editMode: false,
        notes: null
    },
    getters: {
        GET_NOTES(state){
            return state.notes;
        }
    },
    mutations: {
        SET_LOADER(state, payload) {
            this.state.loader = payload;
        },

        SET_EDIT_MODE(state,payload) {
            state.editMode = payload;
        },

        SET_NOTES(state,payload) {
            let array = [];
            if (payload !== null) {
                Object.values(payload).forEach((item) => {
                    array.push(item);
                });
            }
            state.notes = array;
        }
    },
    actions: {

        CREATE_NOTE({commit, dispatch}, payload) {
            let noteKey = firebase.database().ref().child('notes').push().key,
                updates = {},
                note = payload;

            note.key = noteKey
            updates['/notes/'+noteKey] = note;

            commit('SET_LOADER', true);

            let promise = new Promise((resolve, reject) => {
                firebase.database().ref().update(updates)
                    .then(async () => {
                        await dispatch('LOAD_ALL_NOTES');
                        resolve();
                        commit('SET_LOADER', false);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                        commit('SET_LOADER', false);
                    });
            });

            return promise;
        },

        LOAD_ALL_NOTES({commit,dispatch}) {
            commit('SET_LOADER', true);
            firebase.database().ref('notes').orderByKey().once('value')
                .then((data) => {
                    commit('SET_NOTES', data.val());
                    commit('SET_LOADER', false);
                })
                .catch((error) => {
                    console.log(error);
                    commit('SET_LOADER', false);
                })
        },

        REMOVE_NOTE({commit, dispatch}, payload) {
            let ref = firebase.database().ref('notes');

            commit('SET_LOADER', true);

            let promise = new Promise((resolve, reject) => {
                ref.child(payload).remove()
                    .then(async () => {
                        await dispatch('LOAD_ALL_NOTES');
                        resolve();
                        commit('SET_LOADER', false);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                        commit('SET_LOADER', false);
                    });
            });

            return promise;
        },

        UPDATE_NOTE({commit, dispatch},payload){
            let updates = {};

            commit('SET_LOADER', true);

            updates['/notes/'+payload.key] = payload;

            let promise = new Promise((resolve, reject) => {
                firebase.database().ref().update(updates)
                    .then(async () => {
                        await dispatch('LOAD_ALL_NOTES');
                        resolve();
                        commit('SET_LOADER', false);
                    })
                    .catch((error) => {
                        console.log(error);
                        reject();
                        commit('SET_LOADER', false);
                    });
            });

            return promise;
        }
    }
});

export default store;


