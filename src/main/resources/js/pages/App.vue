<template>
    <v-app>
        <div>
            <router-view></router-view>
        </div>
    </v-app>
</template>

<script>

    export default {
        name: "App",
        data: function () {
            return {}
        },
        computed: {},
        methods: {},
    }
</script>

<style lang="scss">
    @import '../../styles/index.scss';
</style>