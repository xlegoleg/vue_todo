<template>
    <div
        class="edit-block"
        :data-note="note.key"
    >
        <div class="main-note__name">
            <span>{{note.name}}</span>
            <div
                class="main-note__actions"
                v-if="notEditedNote"
            >
                <div
                    class="main-note__item"
                    @click="stepBack"
                >
                    <i class="fas fa-undo-alt"></i>
                </div>
                <div
                    class="main-note__item"
                    @click="stepForward"
                >
                    <i class="fas fa-redo-alt"></i>
                </div>
            </div>
        </div>
        <div class="edit-container">

            <Todos
                :todos="note.todos"
                @update:todos="updateEditTodos = updateHandler($event)"
                @save="saveHandler"
            >
            </Todos>

            <div class="edit-footer">
                <button
                    class="edit-button yes"
                    @click="saveNote($event)"
                >
                    SAVE
                    <i
                        class="fas fa-check-circle"
                    >
                    </i>
                </button>
                <button
                    class="edit-button no"
                    @click="removeClickHandler($event)"
                >
                    DELETE
                    <i
                        class="fas fa-times-circle"
                    >
                    </i>
                </button>
            </div>
        </div>

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

    import {mapActions, mapGetters} from 'vuex';

    export default {

        name: 'EditNote',

        components:{
            Todos: () => import('../common/Todos.vue'),
            Modal: () => import('../common/Modal.vue')
        },


        data() {
            return{
                note: {},
                notEditedNote: null,
                showModal: false,
                selectedNote: null
            }
        },

        created() {
            this.getNoteByKey(this.$route.params.key)
        },

        computed: {
            ...mapGetters({
                stateNotes: 'GET_NOTES'
            }),

            editedNote() {
                let note = {
                    name: this.note.name,
                    key: this.note.key,
                    todos: []
                }

                return note;
            }
        },

        methods: {
            ...mapActions({
                removeNote: 'REMOVE_NOTE',
                updateNote: 'UPDATE_NOTE'
            }),

            /**
             * Cancels contributed change
             */
            stepBack() {
                this.note = this.notEditedNote;
                console.log(this.note);
            },

            /**
             * Returns contributed change
             */
            stepForward() {
                this.note = this.editedNote;
                console.log(this.note);
            },

            /**
             * Save previous current note to notEditedNote
             */
            saveHandler(){
                this.notEditedNote = JSON.parse(JSON.stringify(this.note));
                console.log(this.notEditedNote);
                console.log(this.note);
            },

            /**
             * Event handler (When todo-list updated)
             */
            updateHandler($event) {
                this.editedNote.todos = $event;
                console.log('update todos');
                this.note = JSON.parse(JSON.stringify(this.editedNote));
            },

            /**
             * Remove note from database
             * @param $event {Object}
             */
            removeHandler($event) {

                this.removeNote(this.selectedNote).then(() => {
                    this.showModal = false;
                    this.$router.go(-1);
                })
            },

            removeClickHandler($event){
                this.selectedNote = $event.target.closest('.edit-block').dataset.note;
                this.showModal = true;
            },

            saveNote() {
                this.updateNote(this.note).then(() => {
                    this.$router.go(-1);
                });
            },

            /**
             * Event handler (When todo-list updated)
             */
            updateEditHandler($event) {
                this.note.todos = $event;
            },

            getNoteByKey(key) {
                this.stateNotes.forEach((item) => {
                    if (item.key === key) {
                        this.note = item;
                    }
                })
            }
        }
    }

</script>


