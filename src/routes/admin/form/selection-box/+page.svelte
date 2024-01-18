<script lang="ts">
    import { title } from "$lib";
    import { SelectionBox } from "$lib/form";
    title('form SelectionBox');
    let group: string[] = [];
    let checked: boolean = false;
    let selected: 'A' | 'B' | 'C' = 'A';
</script>

<main id="app-main">
    <h1>form SelectionBox</h1>
    <h2>checkbox group</h2>
    <SelectionBox type="checkbox" label="A" value=A bind:group />
    <SelectionBox type="checkbox" label="B" value=B bind:group />
    <SelectionBox type="checkbox" label="C" value=C bind:group />
    <p>
        Resultado do checkbox group
        <br>
        {group}
    </p>
    <h2>checkbox checked</h2>
    <SelectionBox type="checkbox" label="Seleção" bind:checked />
    <p>
        Resultado do checkbox checked
        <br>
        {checked ? 'Sim' : 'Não'}
    </p>
    <h2>radio</h2>
    <SelectionBox type="radio" label="A" bind:selected value=A />
    <SelectionBox type="radio" label="B" bind:selected value=B />
    <SelectionBox type="radio" label="C" bind:selected value=C />
    <p>
        Resultado do radio
        <br>
        {selected}
    </p>
</main>
<aside id="app-aside">
    <a href="/admin/form">Voltar</a>
</aside>
