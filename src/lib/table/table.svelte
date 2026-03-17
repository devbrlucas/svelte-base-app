<script lang="ts">
    import { type PaginatedResponse, Pagination } from "../pagination";

     let { head, body,
        center = false,
        full = false,
        pagination = undefined
    } = $props();
    let table: HTMLTableElement;
    $effect(() => {
        const headCells = table.querySelectorAll<HTMLTableCellElement>('thead > tr > th');
        const bodyRows = table.querySelectorAll<HTMLTableRowElement>('tbody > tr');
        for (const [headCellKey, headCell] of headCells.entries()) {
            for (const [bodyRowKey, bodyRow] of bodyRows.entries()) {
                if (headCells.length !== bodyRow.children.length) return;
                if (bodyRow.children[headCellKey].classList.contains('actions')) continue;
                if (/<b>/.test(bodyRow.children[headCellKey].innerHTML)) continue;
                const b = document.createElement('b');
                b.textContent = `${headCell.textContent}: `;
                bodyRow.children[headCellKey].prepend(b);
            }
        }
    });
</script>

{#if pagination}
    <Pagination meta={pagination.meta} />
{/if}
<table class:center class:full class="app-table-records" bind:this={table}>
    <thead>
        <tr>
            {@render head?.()}
        </tr>
    </thead>
    <tbody>
        {@render body?.()}
    </tbody>
</table>