import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/LandingPage.vue';
import Artist from '../views/Artist.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Artist,
		},
		{
			path: '/gts',
			name: 'gts',
			component: LandingPage,
		},

		// {
		// 	path: '/contacts/:id',
		// 	name: 'contactosID',
		// 	component: Contactos,
		// },
	],
});

export default router;
