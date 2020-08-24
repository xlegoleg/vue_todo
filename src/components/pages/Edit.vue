<template>
    <section class="edit">
        <div class="container">
            <EditNote
                v-if="!isNewNote"
            >
            </EditNote>
            <NewNote
                v-else
            >
            </NewNote>
        </div>
    </section>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {

        name: 'Edit',

        components: {
            EditNote: () => import('../common/EditNote.vue'),
            NewNote: () => import('../common/NewNote.vue')
        },

        data() {
            return {
                action: this.$route.params.key,
                isNewNote: false
            }
        },

        created() {
            this.setEditMode(true);
            if (this.action === 'create') {
                this.isNewNote = true;
            }
        },

        destroyed() {
            this.setEditMode(false);
        },

        methods: {
            ...mapMutations({
                setEditMode: 'SET_EDIT_MODE'
            })
        }

    }

</script>

<style lang="scss">

    .edit{
        &-block{
            margin: 0 auto;
            max-width: 560px;
            margin-top: 100px;
            border: 1px solid $grey-color;
        }
        &-container{
            padding: 10px;
        }
        &-title{
            @include name();
            padding: 10px;
            background-color: $main-color;
            color: $white-color;
        }
        &-input{
            border: 1px solid $grey-color;
            width: 100%;
            height: 30px;
            padding-left: 10px;
        }
        &-input-todo{
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        &-plus{
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: $green-color;
            color: $white-color;
            @include button-hover();
        }
        &-footer{
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-top: 10px;
        }

        &-button{
            color: $white-color;
            font-weight: 700;
            &.yes{
                background-color: $green-color;
                margin-right: 5px;
            }
            &.no{
                background-color: $red-color;
            }
            @include button-hover();
        }

        @include breakpoint($tablet){
            &-block{
                margin-top: 150px;
            }
        }
        @include breakpoint($desktop) {
            &-block{
                margin-top: 200px;
            }
        }
    }

</style>
