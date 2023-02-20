<template>
    <div class="progress-bar-container">
        <div class="progress-bar" ref="progressBar" @click="seek">
            <div class="bar" :style="{ width: progressWidth + '%' }"></div>
            <div v-for="segment in segments" :key="segment" class="segment"
                :style="{ left: (segment * 100 / totalDuration) + '%' }"></div>
        </div>
        <div class="play-time-controls">
            <div class="col-12 my-4">
                <button class="btn btn-primary" id="btn-circle" ref="playBtn" @click="playAudio">
                    <span v-if="!isPlaying">
                        <i class="bi bi-play-fill"></i>
                    </span>
                    <span v-else>
                        <i class="bi bi-pause-fill"></i>
                    </span>
                </button>
            </div>
        </div>

        <div class="search-bar mx-auto">
            <input class="form-control" v-model="filterText" placeholder="Write the name of the song..." />
            <div class="scrollable-list" v-if="filterText">
                <ul>
                    <li class="song-list py-2" @click="autoComplete(item)" v-for="item in filteredList" :key="item">{{ item
                    }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="col-12 my-4">
            <button @click="skipTry" class="skip-btn" ref="skipBtn">SKIP ({{ this.segments[this.try] }}s)</button>
            <button @click="sumbitSong" class="submit-btn" ref="submitBtn">SUMBIT</button>
        </div>
        <audio ref="audioPlayer" class="hidden" :src="audioUrl" controls />
    </div>



    <div v-if="showDialog" class="backdrop">
        <div class="dialog-wrapper">
            <teleport to="body">
                <Dialog :title="title" :message="message" :song="currentSong" @nextGame="loadNext" />
            </teleport>
        </div>
    </div>
</template>

<script>
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";
import Dialog from "./Dialog.vue";
export default {
    components: {
        Dialog,
    },
    data() {
        return {
            progressWidth: 0,
            segments: [1, 2, 3, 4, 8, 16],
            points: [6, 5, 4, 3, 2, 1],
            playTime: 1,
            totalDuration: 1,
            try: 0,
            last: 0,
            isPlaying: false,
            audioUrl: "",
            songFullName: "",
            currentSong: [],
            filterText: '',
            items: [],

            showDialog: false,
            title: "Dialog Title",
            message: "Dialog message goes here.",
        };
    },
    computed: {
        ...mapState(useStore, ["artistName"]),
        filteredList() {
            if (!this.filterText) {

            }
            return this.items.filter(item =>
                item.toLowerCase().includes(this.filterText.toLowerCase())
            );
        }
    },
    methods: {
        ...mapActions(useStore, ["getRandomSongFromArtist"]),
        sumbitSong() {
            if (this.songFullName === this.filterText) {
                this.filterText = "";
                this.title = "NICE GUESS!";
                this.message = "green";
                this.showDialog = true;
            } else {
                this.skipTry();
                this.filterText = "";
            }
        },
        skipTry() {
            if (this.last < 5) {
                this.try = this.last + 1;
                this.last = this.try;
                this.playTime = this.segments[this.try];
                this.totalDuration = this.playTime;
            } else {
                this.title = "YOU FAILED!";
                this.message = "red";
                this.try = 0;
                this.playTime = 16;
                this.showDialog = true;
            }
        },
        disableButtons() {
            this.$refs.playBtn.toggleAttribute("disabled");
            this.$refs.submitBtn.toggleAttribute("disabled");
            this.$refs.skipBtn.toggleAttribute("disabled");
        },
        playAudio() {
            this.disableButtons();
            this.$refs.audioPlayer.currentTime = 0;
            this.$refs.audioPlayer.volume = 0.2;
            this.$refs.audioPlayer.play();
            this.isPlaying = true;
            setTimeout(() => {
                this.$refs.audioPlayer.pause();
                this.isPlaying = false;
            }, this.playTime * 1000);

            const intervalId = setInterval(() => {
                this.progressWidth = (this.progressWidth + 100 / (this.totalDuration * 10)) % 101;
                if (this.progressWidth >= 99) {
                    clearInterval(intervalId);
                    this.disableButtons();
                    this.progressWidth = 0;
                }
            }, 100);
        },
        async startApp() {
            this.resetData();
            try {
                const array = await this.getRandomSongFromArtist();
                const song = array[1];
                array[0].forEach(e => {
                    let artists = e.artists.map(artist => artist.name);
                    let trackName = e.name;
                    let fullName = artists.join(', ') + ' - ' + trackName;
                    this.items.push(fullName)
                });
                const artists = song.artists.map(artist => artist.name);
                const trackName = song.name;
                const fullName = artists.join(', ') + ' - ' + trackName;
                this.currentSong = song;
                console.log(this.currentSong.name)
                this.songFullName = fullName;
                this.audioUrl = song.preview_url;
            } catch (err) {

            }
            this.items = this.removeDuplicates(this.items);
        },
        resetData() {
            this.progressWidth = 0;
            this.playTime = 1;
            this.totalDuration = 1;
            this.try = 0;
            this.last = 0;
            this.isPlaying = false;
            this.audioUrl = "";
            this.songFullName = "";
            this.filterText = '';
            this.items = [];
        },
        removeDuplicates(array) {
            return [...new Set(array)];
        },
        autoComplete(name) {
            this.filterText = name;
        },
        loadNext() {
            this.showDialog = false;
            this.startApp();

        }
    },
    async mounted() {
        this.showDialog = false;
        this.startApp();
    }
};
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 5;
}

.dialog-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
}


.progress-bar-container {
    width: 100%;
    height: 25px;
    border: 1px solid white;
    border-radius: 2.5px;
}

.progress-bar {
    height: 100%;
    position: relative;
    cursor: pointer;
}

.bar {
    height: 100%;
    background-color: green;
    border-radius: 2.5px;
    transition: width 0.1s ease-in-out;
}

.segment {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: white;
}

.hidden {
    display: none;
}

#btn-circle {
    width: 75px;
    height: 75px;
    border-radius: 50px;
    border-color: white;
    font-size: 24px;
    color: white;
    background-color: #191414;
}

.skip-btn {
    width: 200px;
    height: 60px;
    background-color: #191414;
    color: white;
    border-radius: 40px;
    border-color: white;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-right: 40px;
}

.submit-btn {
    width: 200px;
    height: 60px;
    background-color: #1DB954;
    color: #191414;
    border-radius: 40px;
    border-color: #1DB954;
    font-weight: bolder;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin-left: 40px;
}

.submit-btn:hover,
.skip-btn:hover {
    transform: scale(1.1);
}


.search-bar {
    width: 70%;
}

.scrollable-list {
    max-height: 200px;
    overflow-y: scroll;
    color: white;

}

.song-list {
    list-style-type: none;
    width: 100%;
    text-align: start;
}
</style>
