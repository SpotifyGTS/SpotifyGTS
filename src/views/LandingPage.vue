<script>
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";
import AudioBar from "../components/AudioBar.vue";
export default {
    props: ['artist'],
    data() {
        return {
        };
    },
    components: {
        AudioBar,
    },
    computed: {
        ...mapState(useStore, ["artistName"]),
    },

};
</script>

<template>
    <div class="container-fluid text-center mx-auto mt-5 gts-page">
        <div class="row">
            <h1 class="display-1 gts-title pt-4 mt-4">GUESS THE SONG</h1>
            <h3 class="text-white mb-4 pb-4">ft. {{ this.artistName }}</h3>
        </div>
        <div class="row">
            <keep-alive>
                <AudioBar></AudioBar>
            </keep-alive>
        </div>
    </div>
</template>

<style scoped>
.container-fluid {
    background-color: #191414;
    top: 0;
    bottom: 0;
    position: fixed;
    padding-left: 100px;
    padding-right: 100px;
}

.gts-title {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    color: white;
}
</style>