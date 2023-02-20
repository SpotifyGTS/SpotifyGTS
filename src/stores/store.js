import axios from 'axios';
import { defineStore } from 'pinia';

const url = 'http://localhost:3000';

export const useStore = defineStore('store', {
	state() {
		return {
			accessToken: '',
			trackList: [],
			artistName: '',
		};
	},

	actions: {
		async loadData() {
			const clientId = '5f086b72d1a940ada6f48bae912fc33b';
			const clientSecret = '2c204a7abaec4f348dbb07c9985fc8e2';
			const redirectUri = 'your_redirect_uri';
			const scopes = 'your_scopes';

			try {
				const response = await fetch('https://accounts.spotify.com/api/token', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						Authorization: 'Basic ' + btoa(clientId + ':' + clientSecret),
					},
					body: 'grant_type=client_credentials',
				});

				const data = await response.json();
				this.accessToken = data.access_token;
				console.log(this.accessToken);
			} catch (error) {
				console.error(error);
			}
		},
		// async getSongCover(name, artist) {
		// 	const replaceSpaces = (str) => str.replace(/ /g, '%20');
		// 	const token = this.accessToken;

		// 	try {
		// 		const result = await axios.get(`https://api.spotify.com/v1/search?q=${replaceSpaces(name)}%3A${replaceSpaces(artist)}&type=track&limit=1`, {
		// 			headers: {
		// 				Authorization: `Bearer ${token}`,
		// 			},
		// 		});
		// 		const data = result.data;
		// 		console.log(data.tracks.items[0]);
		// 	} catch (error) {
		// 		console.error(error);
		// 	}
		// },
		async getRandomSongFromArtist() {
			try {
				const response = await axios.get('https://api.spotify.com/v1/search', {
					params: {
						q: 'artist:' + this.artistName + ' -remix',
						type: 'track',
						market: 'US',
						limit: 50,
						// This will remove duplicates from the results
						filter: 'NOT "dupe_ids"',
					},
					headers: {
						Authorization: 'Bearer ' + this.accessToken,
					},
				});
				const tracks = response.data.tracks.items;
				this.trackList = tracks;
				const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
				let array = [];
				array.push(tracks);
				array.push(randomTrack);
				console.log(this.artistName);
				return array;
			} catch (error) {
				console.error(error);
				return null;
			}
		},

		async searchArtists(searchQuery) {
			try {
				const response = await axios.get('https://api.spotify.com/v1/search', {
					params: {
						q: searchQuery,
						type: 'artist',
					},
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
				});
				return response.data.artists.items;
			} catch (error) {
				console.error(error);
				return []; // return an empty array if there's an error
			}
		},
		modifyArtistName(name) {
			this.artistName = name;
		},
	},
	getters: {
		// getAllContactos: (state) => async () => {
		// 	let response = await axios.get(url + '/contactos');
		// 	return response.data;
		// },
	},
});
