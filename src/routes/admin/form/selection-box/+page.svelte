<script lang="ts">
    import { title } from "$lib";
    import { SelectionBox } from "$lib/form";
    import { store } from "./store";
    title('form SelectionBox');
    let checked: boolean = false;
    let group: 'A' | 'B' | 'C' = 'A';
</script>

<main id="app-main">
    <h1>form SelectionBox</h1>
    <h2>checkbox group</h2>
    <SelectionBox type="checkbox" label="A" value=A bind:group={$store} />
    <SelectionBox type="checkbox" label="B" value=B bind:group={$store} />
    <SelectionBox type="checkbox" label="C" value=C bind:group={$store} />
    <p>
        Resultado do checkbox group
        <br>
        {$store}
    </p>
    <h2>checkbox checked</h2>
    <SelectionBox type="checkbox" label="Seleção" bind:checked />
    <p>
        Resultado do checkbox checked
        <br>
        {checked ? 'Sim' : 'Não'}
    </p>
    <h2>radio</h2>
    <SelectionBox type="radio" label="A" bind:group value=A />
    <SelectionBox type="radio" label="B" bind:group value=B />
    <SelectionBox type="radio" label="C" bind:group value=C />
    <p>
        Resultado do radio
        <br>
        {group}
    </p>
</main>
<aside id="app-aside">
    <a href="/admin/form">Voltar</a>
</aside>
