<script lang="ts">
    import { onMount } from "svelte";
    export let center = false;
    let table: HTMLTableElement;
    onMount(() => {
        const headCells = table.querySelectorAll<HTMLTableCellElement>('thead > tr > th');
        for (const [key, cell] of headCells.entries()) {
            if (key === headCells.length - 1) continue;
            table
                .querySelectorAll<HTMLTableRowElement>('tbody > tr')
                .forEach(row => {
                    const html = row.children[key].innerHTML;
                    row.children[key].innerHTML = `<b>${cell.textContent}:</b> ${html}`;
                });
        }
    });
</script>

<table class:center class="app-table-records" bind:this={table}>
    <thead>
        <tr>
            <slot name="head"></slot>
        </tr>
    </thead>
    <tbody>
        <slot name="body"></slot>
    </tbody>
</table>