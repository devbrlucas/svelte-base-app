import EditAction from "./actions/edit.svelte";
import DeleteAction from "./actions/delete.svelte";
import ShowAction from "./actions/show.svelte";
import RestoreAction from "./actions/restore.svelte";
export { default as Table } from "./table.svelte";
export const tableActions = {
    edit: EditAction,
    delete: DeleteAction,
    show: ShowAction,
    restore: RestoreAction,
};
