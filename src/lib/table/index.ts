import EditAction from "./actions/edit.svelte";
import DeleteAction from "./actions/delete.svelte";
import ShowAction from "./actions/show.svelte";
import RestoreAction from "./actions/restore.svelte";
import type { Component } from "svelte";
export { default as Table } from "./table.svelte";
export { default as NoRecordsRow } from "./no-records.svelte";
export const tableActions: Record<"edit" | "delete" | "show" | "restore", Component<any>> = {
    edit: EditAction,
    delete: DeleteAction,
    show: ShowAction,
    restore: RestoreAction,
}
