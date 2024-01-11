/// <reference lib="webworker" />

declare global {
	interface BeforeInstallPromptEvent extends Event {
		platforms: string[];
		userChoice: InstallPromptChoice;
		prompt(): Promise<InstallPromptChoice>;
	}
	
	interface InstallPromptChoice {
		outcome: Promise<'accepted' | 'dismissed'>;
		platform: string;
	}

	interface WindowEventMap {
		beforeinstallprompt: BeforeInstallPromptEvent;
	}

	interface SyncManager {
		getTags(): Promise<string[]>;
		register(tag: string): Promise<void>;
	}

	interface SyncEvent extends ExtendableEvent {
		readonly lastChance: boolean;
		readonly tag: string;
	}

	interface ServiceWorkerRegistration {
		readonly sync: SyncManager;
	}

	interface ServiceWorkerGlobalScopeEventMap {
		sync: SyncEvent;
	}

	namespace App {
		interface Error {
			detailed_message?: string;
		}
	}
}
export * from "./utils";
export * from "./layout";
export * from "./ajax";
export * from "./table";
export * from "./link";
export { Pagination } from "./pagination";
export * from "./messages";
export * from "./datalist";
export * from "./dialog";
