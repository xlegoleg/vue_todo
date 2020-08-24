<template>
    <div class="main-notes__panel">
        <div class="main-notes__panel-title">Notes</div>
        <div class="main-notes__panel-actions">
            <router-link
                to="/note/create"
                class="main-notes__panel-add"
            >
                <i class="fas fa-plus-circle"></i>
                <span>add note</span>
            </router-link>
        </div>
    </div>
</template>

<script>

    export default {

        name: 'Panel',

        data() {
            return{

            }
        }

    }

</script>

<style lang="scss">

    .main{
        &-notes{
            &__panel{
                padding: 10px;
                background-color: $panel-color;
                display: flex;
                justify-content: space-between;
                align-items: center;
                &-title{
                    @include small-title();
                    color: $white-color;
                }
                &-add{
                    color: $white-color;
                    background-color: $panel-color;
                    @include underline();
                }
            }
        }
        @include breakpoint($tablet){
            &-notes{
                &__panel{
                    padding: 15px;
                }
            }
        }
        @include breakpoint($desktop) {
            &-notes{
                &__panel{
                    padding: 20px;
                    &-add{
                        font-size: 24px;
                    }
                }
            }
        }
    }

</style>
