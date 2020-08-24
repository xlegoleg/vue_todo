<template>
    <div id="app">
        <Header></Header>
        <main>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </main>
    </div>
</template>


<script>

    import {mapState} from 'vuex'

    export default {

        name: "app",

        components: {
            Home: () => import('./components/pages/Home.vue'),
            Header:() => import('./components/common/Header.vue')
        },

        data(){
          return{

          }
        },

    }

</script>

<style lang="scss">

</style>
