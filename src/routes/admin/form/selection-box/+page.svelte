<script lang="ts">
    import { title } from "$lib";
    import { SelectionBox } from "$lib/form";
    title('form SelectionBox');
    let checked: boolean = false;
    let group: 'A' | 'B' | 'C' = 'A';
    let array: string[] = ['B'];
    let otherArray: string[] = ['D'];
</script>

<main id="app-main">
    <h1>form SelectionBox</h1>
    <h2>checkbox group</h2>
    <SelectionBox type="checkbox" label="A" value=A bind:group={array} key=array />
    <SelectionBox type="checkbox" label="B" value=B bind:group={array} key=array />
    <SelectionBox type="checkbox" label="C" value=C bind:group={array} key=array />
    <h2>other checkbox group</h2>
    <SelectionBox type="checkbox" label="D" value=D bind:group={otherArray} key=otherArray />
    <SelectionBox type="checkbox" label="E" value=E bind:group={otherArray} key=otherArray />
    <SelectionBox type="checkbox" label="F" value=F bind:group={otherArray} key=otherArray />
    <p>
        Resultado do checkbox group array
        <br>
        {array}
    </p>
    <p>
        Resultado do checkbox group otherArray
        <br>
        {otherArray}
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
    <button type="button" on:click={() => array = []}>
        Limpar grupo
    </button>
    <button type="button" on:click={() => array = ['A', 'B', 'C']}>
        Marcar todos
    </button>
    <a href="/admin/form">Voltar</a>
</aside>
