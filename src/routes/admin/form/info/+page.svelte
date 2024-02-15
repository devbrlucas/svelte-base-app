<script lang="ts">
    import { title } from "$lib";
    import { Input, SelectionBox, TextArea } from "$lib/form";
    import Select from "$lib/form/components/select.svelte";
    title('form Input');
    let file: File;
    let value: string;
    let group: boolean;
</script>

<main id="app-main">
    <h1>Teste do botão de mais informações</h1>
    <p>
        <Input type="file" label="Selecionar arquivo com info" bind:file>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, inventore. Totam voluptatum maxime inventore illum voluptatibus cum error hic labore? Fugit, modi. Expedita tempora voluptatem dolores qui, eaque eum cumque.
        </Input>
        <Input type="datetime-local" label="Selecionar data sem info" />
    </p>
    <p>
        <Select label="Seleção com info" bind:value>
            <option value="">Item</option>
            <option value=A>Item Dois</option>
            <svelte:fragment slot="info">
                Informações adicionais sobre o campo
            </svelte:fragment>
        </Select>
        <Select label="Seleção sem info" bind:value>
            <option value="">Item</option>
            <option value=A>Item Dois</option>
        </Select>
    </p>
    <p>
        <SelectionBox type="radio" label="Radio com info" value={true} bind:group>
            Informações adicionais sobre o campo
        </SelectionBox>
        <SelectionBox type="radio" label="Radio sem info" value={false} bind:group />
    </p>
    <p>
        <TextArea rows=5 cols=50 label="Texto com descrição">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius, exercitationem. Molestiae in error eius ad adipisci mollitia consequatur. Voluptatum fugit repellat sint, perspiciatis quibusdam ex officiis cum! Et, quae distinctio.
        </TextArea>
        <TextArea rows=5 cols=50 label="Texto sem descrição" />
    </p>
</main>
<aside id="app-aside">
    <a href="/admin/form">Voltar</a>
</aside>
