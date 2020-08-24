<template>
    <div>
        <div class="edit-input-todo">
            <input
                type="text"
                class="edit-input edit-input_todo"
                placeholder="Add todo"
                ref="todo"
            >
            <div
                class="edit-plus"
                @click="addTodo"
            >
                <i class="fas fa-plus"></i>
            </div>
        </div>
        <template v-if= localTodos.length>
            <div class="edit-todos__title">Todos:</div>
            <div
                class="main-note__todos"
            >
                <div class="main-note__todos-item"
                     v-for="(todo, index) of localTodos"
                     :key="index"
                >
                    <span
                        :ref="`title-${index}`">{{todo.task}}</span>
                    <input
                        :ref="`input-${index}`"
                        type="text"
                        placeholder="Enter new task"
                        class="task-input"
                    >
                    <div class="main-note__actions">
                        <input
                            type="checkbox"
                            :checked="todo.done"
                            @change="checkHandler($event,index)"
                        >
                        <div
                            :ref="`edit-${index}`"
                            class="main-note__item edit"
                            @click="editHandler($event,index)"
                        >
                            <i
                                class="fas fa-pen-square"
                            >
                            </i>
                        </div>
                        <div
                            :ref="`ok-${index}`"
                            class="main-note__item ok"
                            @click="okHandler($event, index)"
                        >
                            <i
                                class="fas fa-check-circle"
                            >
                            </i>
                        </div>
                        <div
                            class="main-note__item remove"
                            @click="removeHandler($event, index)"
                        >
                            <i
                                class="fas fa-times-circle"
                            >
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>


<script>

    export default {

        name: 'Todos',

        props: ['todos', 'isNewNote'],

        data() {
            return{

            }
        },

        mounted() {

        },

        computed: {
            localTodos() {
                let arr = [];

                if (this.todos !== undefined) {
                    this.todos.forEach((item) => {
                        arr.push(item);
                    });

                }

                return arr;
            }
        },

        methods:{

            addTodo() {
                let input = this.$refs.todo,
                    todo = input.value,
                    event;

                if (todo) {
                    this.localTodos.push({
                        task: todo,
                        done: false
                    });
                    input.value = '';
                    this.$emit('save');
                    this.$emit('update:todos', this.localTodos);
                } else {
                    return;
                }
            },

            /**
             * Checkbox toggler
             * @param $event {Object}
             * @param index {Int}
             */
            checkHandler($event, index) {
                this.localTodos[index].done = !this.localTodos[index].done;
            },

            /**
             * Remove todo
             * @param $event {Object}
             * @param index {Int}
             */
            removeHandler($event, index) {
                this.localTodos.splice(index,1);
                this.$emit('save');
                this.$emit('update:todos', this.localTodos);
            },

            /**
             * Switch todo title to input
             * @param $event {Object}
             * @param index {Int}
             */
            editHandler($event, index) {
                let inputKey = `input-${index}`,
                    titleKey = `title-${index}`,
                    editKey = `edit-${index}`,
                    okKey = `ok-${index}`;

                this.$refs[okKey][0].style.display = 'inline-block';
                this.$refs[inputKey][0].style.display = 'block';
                this.$refs[titleKey][0].style.display = 'none';
                this.$refs[editKey][0].style.display = 'none';
            },

            /**
             * Set new todo title
             * @param $event {Object}
             * @param index {Int}
             */
            okHandler($event, index) {
                let inputKey = `input-${index}`,
                    titleKey = `title-${index}`,
                    editKey = `edit-${index}`,
                    okKey = `ok-${index}`,
                    input = this.$refs[inputKey][0];

                this.$refs[okKey][0].style.display = 'none';
                this.$refs[inputKey][0].style.display = 'none';
                this.$refs[titleKey][0].style.display = 'inline-block';
                this.$refs[editKey][0].style.display = 'inline-block';

                if (input.value) {
                    this.$emit('save');
                    this.localTodos[index].task = input.value;
                    this.$emit('update:todos', this.localTodos);
                    input.value = '';
                }
            },

            /**
             * Set local todos from props
             */
            setLocalTodos() {
                if (this.todos !== undefined){
                    this.todos.forEach((item) => {
                        this.localTodos.push(item);
                    })
                }
            }

        }
    }

</script>

<style lang="scss" scoped>

    .edit-todos__title{
        font-size: 16px;
        font-weight: 700;
    }

    .main-note__actions{
        div{
            i{
                transition: all 0.2s ease-in;
                color: $grey-color;
            }
            transition: all 0.2s ease-in;
            &.ok{
                display: none;
                &:hover{
                    i{
                        transition: all 0.2s ease-in;
                        color: $green-color;
                    }
                }
            }
            &.edit{
                &:hover{
                    i{
                        transition: all 0.2s ease-in;
                        color: $main-color;
                    }
                }
            }
            &.remove{
                &:hover{
                    i{
                        transition: all 0.2s ease-in;
                        color: $red-color;
                    }
                }
            }
        }
        input[type=checkbox]{
            width: 16px;
            height: 16px;
        }

    }

    .task-input{
        display: none;
    }

</style>
