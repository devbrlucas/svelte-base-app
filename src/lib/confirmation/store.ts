import { writable } from "svelte/store";
import type { ConfirmationProperites } from "./index";
export const store = writable<ConfirmationProperites | null>(null);