<template>
    <div class="main-notes__blocks">
        <transition-group name="fade" mode="out-in">
            <div class="main-note"
                 v-for="(note, index) of notes"
                 :key="`${note.name}-${index}`"
                 :data-note="note.key"
            >
                <div class="main-note__name">
                    <span>{{note.name}}</span>
                    <div class="main-note__actions">
                        <router-link
                            :to="`/note/${note.key}`"
                            class="main-note__item edit"
                        >
                            <i
                                class="fas fa-pen-square"
                            >
                            </i>
                        </router-link>
                        <div
                            class="main-note__item remove"
                            @click="removeClickHandler($event)"
                        >
                            <i
                                class="fas fa-times-circle"
                            >
                            </i>
                        </div>
                    </div>
                </div>
                <ul
                    class="main-note__todos"
                    v-if="note.hasOwnProperty('todos')"
                >
                    <template
                        v-for="(todo, index) of note.todos"
                    >
                        <li class="main-note__todos-item"
                            :key="index"
                            :class="{ completed: todo.done, pending: !todo.done }"
                            v-if="index < 3"
                        >
                            <span>{{todo.task}}</span>
                            <i
                                class="fas fa-check-circle"
                                v-if="todo.done"
                            >
                            </i>
                            <i
                                class="fas fa-clock"
                                v-else
                            >

                            </i>
                        </li>
                    </template>
                    <li class="main-note__todos-item"
                        v-if="note.todos.length > 3"
                    >
                        <span>{{`...and ${note.todos.length - 3} more todos`}}</span>
                    </li>
                </ul>
                <span class="main-note__todos-item"
                    v-if="!note.hasOwnProperty('todos')"
                >
                    <span>Nothing to do</span>
                </span>
            </div>
        </transition-group>

        <span
            class="loader"
            v-if="loader"
        >
            <span class="loader-inner"></span>
        </span>

        <Modal
            :mode="'remove'"
            v-if="showModal"
            @remove="removeHandler"
            @close = "showModal = false"
        >
            <h3 slot="header">Remove note?</h3>
        </Modal>
    </div>
</template>

<script>

    import {mapState, mapActions} from 'vuex';

    export default {

        name: 'Notes',

        components: {
            Modal: () => import('../common/Modal.vue')
        },

        data() {
            return {
                showModal: false,
                selectedNote: null
            }
        },

        mounted() {
            this.loadAllNotes();
        },

        computed: {
            ...mapState({
                notes: state => state.notes,
                loader: state => state.loader
            })
        },

        methods: {
            ...mapActions({
                loadAllNotes: 'LOAD_ALL_NOTES',
                removeNote: 'REMOVE_NOTE'
            }),

            removeClickHandler($event) {
                this.selectedNote = $event.target.closest('.main-note').dataset.note;
                this.showModal = true;
            },

            /**
             * Remove note from database
             * @param $event {Object}
             */
            removeHandler($event) {
                this.removeNote(this.selectedNote);
                this.showModal = false;
            }
        }

    }

</script>

<style lang="scss">

    .main{
        &-notes{
            &__blocks{
                padding: 10px;
                border: 1px solid $grey-color;
                span[mode="out-in"]{
                    display: grid;
                    grid-template-columns: repeat(1, 1fr);
                    grid-gap: 10px;
                }
            }
        }
        &-note{
            border: 1px solid $grey-color;
            &__name{
                padding: 10px;
                background-color: $main-color;
                color: $white-color;
                @include name();
                display: flex;
                justify-content: space-between;
            }
            &__todos{
                padding: 10px 0px;
                &-item{
                    padding: 5px 10px;
                    display: flex;
                    justify-content: space-between;
                    &:not(:last-child){
                        border-bottom: 1px solid $grey-color;
                    }
                    i{
                        font-size: 20px;
                    }
                    &.completed{
                        i{
                            color: green;
                        }
                        span{
                            text-decoration: line-through;
                            color: $grey-color;
                        }
                    }
                    &.pending{
                        i{
                            color: $grey-color;
                        }
                    }
                }
            }
            &__item{
                display: inline-block;
                font-size: 20px;
                transition: all 0.2s ease-in;
                i{
                    color: $white-color;
                }
                &:first-child{
                    margin-right: 5px;
                }
                &:hover{
                    cursor: pointer;
                    transition: all 0.2s ease-in;
                    transform: scale(1.15);
                }
            }
        }
        @include breakpoint($tablet){
            &-notes{
                &__blocks{
                    padding: 15px;
                    span[mode="out-in"]{
                        grid-template-columns: repeat(2, 1fr);
                    }
                }
            }
        }
        @include breakpoint($desktop) {
            &-notes{
                &__blocks{
                    span[mode="out-in"]{
                        grid-template-columns: repeat(3, 1fr);
                    }
                    padding: 20px;
                }
            }
        }
    }

</style>
