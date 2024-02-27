// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
	namespace SvelteBaseApp {
		interface CurrentUser {
			user: {
				name: string;
				email: string;
				phone: string;
				image: string | null;
			}
			type: string;
		}
	}
}

export {};
