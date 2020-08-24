<template>
    <header class="header">
        <div class="container">
            <nav class="header-nav">
                <div class="header-title">Todo list</div>
                <div
                    v-if="editMode"
                    class="header-nav__back"
                    @click="showModal = true"
                >
                    <i class="fas fa-arrow-circle-left"></i>
                    <span>Cancel</span>
                </div>
            </nav>
        </div>

        <Modal
            v-if="showModal"
            @close="showModal = false"
            :mode="'edit'"
        >
            <h3 slot="header">
                Cancel editing?
            </h3>
        </Modal>
    </header>
</template>

<script>

    import {mapState} from "vuex";

    export default {

        name:'Header',

        components: {
            Modal: () => import('../common/Modal.vue')
        },

        data() {
            return{
                showModal: false
            }
        },

        computed: {
            ...mapState({
                editMode: state => state.editMode
            })
        },

        methods: {

        }

    }

</script>

<style lang="scss">

    .header{
        padding: 20px 0;
        background-color: $main-color;
        &-title{
            color: $white-color;
            @include title();
        }
        &-nav{
            display: flex;
            align-items: center;
            &__back{
                color: $white-color;
                @include underline();
                font-size: 20px;
                margin-left: auto;
                max-height: 35px;
            }
        }
    }

</style>
