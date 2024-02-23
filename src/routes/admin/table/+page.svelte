<script lang="ts">
    import { Table, tableActions, title } from "$lib";
    import type { PageData } from "./$types";
    export let data: PageData;
    title('table');
    let toggle: boolean = false;
    const rows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [0, 0, 0],
    ];
    async function callback()
    {
        return true;    
    }
</script>

<main id="app-main">
    <h1>table</h1>
    <h2>Com <i>actions</i></h2>
    <Table center>
        <svelte:fragment slot="head">
            <th>Número<br>UM</th>
            <th>Número<br>DOIS</th>
            <th>Número<br>TRÊS</th>
            <th>Ações</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#key toggle}
                {#each rows as row}
                    <tr>
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                        <td class="actions">
                            <svelte:component this={tableActions.show} href="/admin/table/nav" />
                            <svelte:component this={tableActions.edit} href="/admin/table/nav" />
                            <svelte:component this={tableActions.delete} href="/table" {callback} />
                            <svelte:component this={tableActions.restore} href="/table" {callback} />
                        </td>
                    </tr>
                {/each}
            {/key}
        </svelte:fragment>
    </Table>
    <h2>Sem <i>actions</i></h2>
    <Table center>
        <svelte:fragment slot="head">
            <th>Número<br>UM</th>
            <th>Número<br>DOIS</th>
            <th>Número<br>TRÊS</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#each rows as row}
                <tr>
                    <td>{row[0]}</td>
                    <td>{row[1]}</td>
                    <td>{row[2]}</td>
                </tr>
            {/each}
        </svelte:fragment>
    </Table>
    <h2>Vazia</h2>
    <Table center>
        <svelte:fragment slot="head">
            <th>Número<br>UM</th>
            <th>Número<br>DOIS</th>
            <th>Número<br>TRÊS</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            <tr class="hover-disabled">
                <td colspan="3">Nenhum registro encontrado</td>
            </tr>
        </svelte:fragment>
    </Table>
    <h2>Com pagination</h2>
    <Table center pagination={{meta: data.meta, links: data.links}}>
        <svelte:fragment slot="head">
            <th>Número<br>UM</th>
            <th>Número<br>DOIS</th>
            <th>Número<br>TRÊS</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            <tr class="hover-disabled">
                <td colspan="3">Nenhum registro encontrado</td>
            </tr>
        </svelte:fragment>
    </Table>
    <h2>Com <i>HTML</i></h2>
    <Table center>
        <svelte:fragment slot="head">
            <th>Número<br>UM</th>
            <th>Número<br>DOIS</th>
            <th>Número<br>TRÊS</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            <tr>
                <td>UM</td>
                <td>DOIS</td>
                <td>
                    <button type="button" on:click={() => alert('oi')}>Teste</button>
                </td>
            </tr>
        </svelte:fragment>
    </Table>
</main>
<aside id="app-aside">
    <button type="button" on:click={() => toggle = !toggle}>
        Refazer corpo da table com actions
    </button>
</aside>
<style>
    h2 {
        margin-top: 2em;
    }
</style>