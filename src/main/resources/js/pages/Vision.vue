<template>
    <v-layout>
        <v-img :src="`/img/11967.jpg`" alt="Фото" height="1004" max-width="1366"></v-img>
        <div v-if="items.length > 0" v-for="i in items" v-bind:style="{position: 'absolute', top: i.b + 24 + 'px', left: i.a + 'px', width: width(i) + 'px', height: height(i) + 'px', border: '5px solid orange', color: 'white'}">
            {{i.title}}
        </div>
        <v-btn @click="detect">detect</v-btn>
    </v-layout>
</template>

<script>
    import axios from 'axios'
    import {mapActions} from 'vuex'
    export default {
        name: "Visio",
        data: () => ({
            items: []
        }),
        methods:{
            ...mapActions(['getDetected']),
            async detect() {
                this.items = [];
                const {data: {body: {pedestrian_labels}}} = await axios.post('/vision');
                const {labels} = pedestrian_labels[0];
                labels.length && labels.forEach(({rus, coord}) => {
                    this.items.push(Object.assign({}, {title: rus, a:coord[0], b:coord[1], c:coord[2], d:coord[3]}))
                });
            },
            width(item) {
                const {a, c} = item;
                return c - a;
            },
            height(item) {
                const {d, b} = item;
                return d - b;
            }
        }
    }
</script>

<style scoped>

</style>