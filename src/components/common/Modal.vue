<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        default header
                    </slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button
                            class="modal-button yes"
                            @click="confirmHandler($event,mode)"
                        >
                            YES
                        </button>
                        <button
                            class="modal-button no"
                            @click="$emit('close')"
                        >
                            NO
                        </button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {

        props:['mode'],

        name: 'Modal',

        data() {
            return{

            }
        },

        methods: {
            /**
             * Calls the function corresponding event mode
             * @param $event {Object}
             * @param mode {String}
             */
            confirmHandler($event, mode) {
                switch (mode) {

                    case 'edit':
                        this.goBackfromEdit();
                        break;

                    case 'remove':
                        this.removeItem()
                        break;
                }
            },

            removeItem(){
                this.$emit('remove');
            },

            goBackfromEdit() {
                this.$store.commit('SET_EDIT_MODE', false);
                this.$emit('close');
                this.$router.go(-1);
            }
        }

    }

</script>

<style lang="scss">
    .modal{
        &-mask{
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: table;
            transition: opacity 0.3s ease;
        }
        &-wrapper{
            display: table-cell;
            vertical-align: middle;
        }
        &-container{
            width: 300px;
            margin: 0px auto;
            padding: 20px 30px;
            background-color: #fff;
            border-radius: 2px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
        }
        &-header h3{
            margin-top: 0;
            font-size: 24px;
            color: $main-color;
        }
        &-body{
            margin: 20px 0;
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
        &-enter{
            opacity: 0;
        }
        &-leave-active{
            opacity: 0;
        }
    }

    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
        transform: scale(1.1);
    }

</style>
