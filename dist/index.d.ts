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
}
export * from "./formatter";
export * from "./layout";
export * from "./ajax";
export * from "./records-table";
export * from "./link";
export { Pagination } from "./pagination";
export { messages } from "./messages";
