<script lang="ts">
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    type Type = 
        'password' |
        'number' |
        'email' |
        'text' |
        'tel' |
        'date' |
        'month' |
        'datetime-local' |
        'search' |
        'file' |
        'color';

    export let type: Type
    export let label: string;
    export let value: string | number | undefined | null = null;
    export let file: FileList | File | null = null;
    export let error: string = '';
    export let disabled: boolean = false;
    const id = `input-${Math.random() * 5}`;
    function handleInputFileChange(event: Event): void
    {
        const input = event.currentTarget as HTMLInputElement;
        if (!input.files) {
            file = null;
            return;
        }
        if (input.files.length === 0) {
            file = null;
        } else {
            file = input.multiple ? input.files : input.files[0];
        }
    }
</script>

<div class="app input-component" class:disabled class:info={$$slots.default}>
    {#if $$slots.default}
        <LabelInfo {id} {label}>
            <slot></slot>
        </LabelInfo>
    {:else}
        <LabelInfo {id} {label} />
    {/if}
    {#if type === 'password'}
        <input {id} type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'number'}
        <input {id} type="number" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'email'}
        <input {id} type="email" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'text'}
        <input {id} type="text" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'tel'}
        <input {id} type="tel" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'date'}
        <input {id} type="date" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'month'}
        <input {id} type="month" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'search'}
        <input {id} type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'color'}
        <input {id} type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'datetime-local'}
        <input {id} type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'file'}
        <input {id} type="file" autocomplete="off" {...$$restProps} {disabled} on:input on:blur on:change={handleInputFileChange} />
        {#if file == null}
            <label for={id} class="filename">Nenhum arquivo selecionado</label>
        {:else if file instanceof File}
            <label for={id} class="filename">{file.name}</label>
        {:else if file instanceof FileList}
            {#each file as _file}
                <label for={id} class="filename">{_file.name}</label>
            {/each}
        {/if}
    {/if}
    <Error name={error} />
</div>