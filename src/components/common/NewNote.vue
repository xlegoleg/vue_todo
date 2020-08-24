<template>
    <div class="edit-block">
        <div class="main-note__name">
            <span>Create new note</span>
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
            <input
                class="edit-input"
                type="text"
                placeholder="Note name"
                ref="name"
            >

            <Todos
                :todos="note.todos"
                :isNewNote="true"
                @save="saveHandler"
                @update:todos="updateTodos = updateHandler($event)"
            >
            </Todos>

            <div class="edit-footer">
                <button
                    class="edit-button yes"
                    @click="saveNote"
                >
                    SAVE
                    <i
                        class="fas fa-check-circle"
                    >
                    </i>
                </button>
            </div>

        </div>
    </div>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex';

    export default {

        name: 'NewNote',

        components:{
            Todos: () => import('../common/Todos.vue')
        },

        data() {
            return{
                note: {
                    name: '',
                    todos: [],
                },
                editedNote: {
                    name: '',
                    todos: [],
                },
                notEditedNote: null,
            }
        },

        computed: {

            isEdited() {
                return this.notEditedNote;
            }

        },

        methods: {
            ...mapActions({
                createNote: 'CREATE_NOTE'
            }),

            ...mapMutations({
                setEditMode: 'SET_EDIT_MODE'
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
             * Save new note and go back to home page
             */
            saveNote() {
                this.note.name = this.$refs.name.value;
                this.createNote(this.note).then(() => {
                    this.setEditMode(false);
                    this.$router.go(-1);
                });
            }
        }

    }

</script>
