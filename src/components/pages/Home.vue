<template>
    <section class="main">
        <div class="container">
            <div class="main-notes">
                <Panel></Panel>
                <Notes></Notes>
            </div>
        </div>
    </section>
</template>

<script>

    export default {

        name: 'Home',

        components: {
            Panel: () => import('../common/Panel.vue'),
            Notes: () => import('../common/Notes.vue')
        },

        data() {
            return{

            }
        }

    }

</script>

<style lang="scss">

    .main{
        &-notes{
            margin-top: 100px;
        }
        @include breakpoint($tablet){
            &-notes{
                margin-top: 150px;
            }
        }
        @include breakpoint($desktop) {
            &-notes{
                margin-top: 200px;
            }
        }
    }

</style>
