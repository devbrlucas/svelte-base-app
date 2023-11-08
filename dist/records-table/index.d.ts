import EditAction from "./actions/edit.svelte";
import DeleteAction from "./actions/delete.svelte";
import ShowAction from "./actions/show.svelte";
import RestoreAction from "./actions/restore.svelte";
export { default as Table } from "./table.svelte";
export declare const tableActions: {
    edit: typeof EditAction;
    delete: typeof DeleteAction;
    show: typeof ShowAction;
    restore: typeof RestoreAction;
};
