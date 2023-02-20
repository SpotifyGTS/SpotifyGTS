<script>
import AppMenu from "./views/AppMenu.vue";
import AppFooter from "./views/AppFooter.vue";
import { useStore } from "./stores/store.js";
import { mapState, mapActions } from "pinia";

export default {
    components: {
        AppMenu,
        AppFooter,
    },
    methods: {
        ...mapActions(useStore, ["loadData"]),
    },
    computed: {
        ...mapState(useStore, []),
    },
    async mounted() {
        let response = await this.loadData();
    },
};
</script>

<template>
    <app-menu titulo="Titulo"></app-menu>
    <router-view></router-view>
    <app-footer></app-footer>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>