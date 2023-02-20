<template>
    <div class="dialog ">
        <div class="row">
            <h2 class=" guess-title" :class="message">{{ title }}</h2>
        </div>
        <div class="row justify-content-center mt-5">
            <img class="guess-img" :src="song.album.images[0].url" />
        </div>
        <div class="row justify-content-center mt-3 song-title">
            {{ songName }}
        </div>
        <div class="row justify-content-center song-artists">
            {{ artists }}
        </div>
        <div class="buttons-div mt-5">
            <div class="row text-center justify-content-center song-artists">
                <div class="col-lg-6 col-12">
                    <button class="button-dialog spotify-open" @click="openSpotify">Open in Spotify</button>
                </div>
                <div class="col-lg-6 col-12">
                    <button class="button-dialog one-more" @click="nextGame">One more!</button>
                </div>

            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        title: String,
        message: String,
        song: Object,
    },
    methods: {
        nextGame() {
            this.$emit("nextGame")
        },
        openSpotify() {
            window.open(this.song.external_urls.spotify, "_blank", "noreferer");
        },
    },
    computed: {
        artists() {
            let artists = this.song.artists.map(artist => artist.name);
            return artists.join(' • ');
        },
        songName() {
            return this.song.name;
        }
    },
};
</script>
  
<style scoped>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #3a3a3a;
    padding: 40px;
    border-radius: 40px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    z-index: 10;
    color: white;
}

.guess-title {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bolder;
    font-size: 80px;
}

.green {
    color: green;
}

.red {
    color: red;
}

.guess-img {
    width: auto;
    height: 300px;
}

.song-title {
    font-size: 22px;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.song-artists {
    font-size: 14px;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgb(182, 182, 182);
}

.one-more {
    width: 200px;
    height: 60px;
    background-color: #1DB954;
    color: #191414;
    border-radius: 40px;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
}

.spotify-open {
    width: 200px;
    height: 60px;
    background-color: #191414;
    color: white;
    border-radius: 40px;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
}

.button-dialog:hover {
    transform: scale(1.1);
}
</style>
  