<script lang="ts">
    import { afterUpdate } from "svelte";
    export let center = false;
    let table: HTMLTableElement;
    afterUpdate(() => {
        const headCells = table.querySelectorAll<HTMLTableCellElement>('thead > tr > th');
        const bodyRows = table.querySelectorAll<HTMLTableRowElement>('tbody > tr');
        for (const [headCellKey, headCell] of headCells.entries()) {
            for (const [bodyRowKey, bodyRow] of bodyRows.entries()) {
                if (headCells.length !== bodyRow.children.length) return;
                if (bodyRow.children[headCellKey].classList.contains('actions')) continue;
                const html = bodyRow.children[headCellKey].textContent ?? '';
                if (/<b>/.test(bodyRow.children[headCellKey].innerHTML)) continue;
                bodyRow.children[headCellKey].innerHTML = `<b>${headCell.textContent}:</b> ${html}`;
            }
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