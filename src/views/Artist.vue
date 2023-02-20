<!-- <script>
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";
import axios from 'axios';

export default {
    data() {
        return {
            searchQuery: '',
            artists: [],
        };
    },
    methods: {
        ...mapActions(useStore, ["searchArtists", "modifyArtistName"]),
        async makeRequest() {
            this.artists = await this.searchArtists(this.searchQuery);
        },
        loadGame(name) {
            this.modifyArtistName(name);
            this.$router.push("/gts")
        }
    },
};
</script>

<template>
    <div class="container-fluid bg">
        <input type="text" v-model="searchQuery" @input="makeRequest">
        <div class="select-artist" @click="loadGame(artist.name)" v-for="artist in artists" :key="artist.id">{{
            artist.name
        }}</div>
    </div>
</template>


<style>
.bg {
    background-color: #191414;
    position: fixed;
    height: 100%;
    display: grid;
    place-items: center;
}

.select-artist {
    color: white;
}
</style>
 -->

<template>
    <div class="container-fluid bg ">

        <div class="row">
            <div class="col-12">
                <div class="search-box">
                    <input type="text" placeholder=" " @focus="onFocus" v-model="searchQuery" @input="makeRequest" />
                    <span></span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="scrollable-list my-3 pr-1" v-if="searchQuery">
                    <ul>
                        <li class="song-list py-2" @click="autoComplete(item)" v-for="item in artists" :key="item">{{
                            item.name
                        }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
  
<script>
import { useStore } from "../stores/store.js";
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            searchQuery: '',
            artists: [],
        };
    },
    methods: {
        onFocus(event) {
            event.target.value = '';
        },
        ...mapActions(useStore, ["searchArtists", "modifyArtistName"]),
        async makeRequest() {
            this.artists = await this.searchArtists(this.searchQuery);
        },
        loadGame(name) {
            this.modifyArtistName(name);
            this.$router.push("/gts")
        },
        autoComplete(name) {
            this.searchQuery = name.name;
            setTimeout(() => {
                this.loadGame(this.searchQuery);
            }, 500);

        },
    },
};
</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Raleway:400,400i,700');



.bg {
    background-color: #191414;
    height: 100vh;
    display: grid;
    place-content: center;
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

.search-box {
    border: solid 5px #1DB954;
    display: inline-block;
    position: relative;
    border-radius: 50px;
}

.search-box input[type='text'] {
    font-family: Raleway, sans-serif;
    font-size: 20px;
    font-weight: bold;
    width: 50px;
    height: 50px;
    padding: 5px 40px 5px 10px;
    border: none;
    box-sizing: border-box;
    border-radius: 50px;
    transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 0.5) 300ms;
}

.search-box input[type='text']:focus {
    outline: none;
}

.search-box input[type='text']:focus,
.search-box input[type='text']:not(:placeholder-shown) {
    width: 400px;
    transition: width 800ms cubic-bezier(0.5, -0.5, 0.5, 1.5);
}

.search-box input[type='text']:focus+span,
.search-box input[type='text']:not(:placeholder-shown)+span {
    bottom: 13px;
    right: 10px;
    transition: bottom 300ms ease-out 800ms, right 300ms ease-out 800ms;
}

.search-box input[type='text']:focus+span:after,
.search-box input[type='text']:not(:placeholder-shown)+span:after {
    top: 0;
    right: 10px;
    opacity: 1;
    transition: top 300ms ease-out 1100ms, right 300ms ease-out 1100ms, opacity 300ms ease 1100ms;
}

.search-box span {
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: -13px;
    right: -15px;
    transition: bottom 300ms ease-out 300ms, right 300ms ease-out 300ms;
}

.search-box span:before,
.search-box span:after {
    content: '';
    height: 25px;
    border-left: solid 5px #1DB954;
    position: absolute;
    transform: rotate(-45deg);
}

.search-box span:after {
    transform: rotate(45deg);
    opacity: 0;
    top: -20px;
    right: -10px;
    transition: top 300ms ease-out, right 300ms ease-out, opacity 300ms ease-out;
}
</style>
  
