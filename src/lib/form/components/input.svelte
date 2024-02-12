<script lang="ts">
    import Error from "./error.svelte";
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

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="app input-component" class:disabled>
    <span>{label}</span>
    {#if type === 'password'}
        <input type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'number'}
        <input type="number" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'email'}
        <input type="email" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'text'}
        <input type="text" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'tel'}
        <input type="tel" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'date'}
        <input type="date" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'month'}
        <input type="month" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'search'}
        <input type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'color'}
        <input type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'datetime-local'}
        <input type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'file'}
        <input type="file" autocomplete="off" {...$$restProps} {disabled} on:input on:blur on:change={handleInputFileChange} />
        {#if file == null}
            <span>Nenhum arquivo selecionado</span>
        {:else if file instanceof File}
            <span>{file.name}</span>
        {:else if file instanceof FileList}
            {#each file as _file}
                <span>{_file.name}</span>
            {/each}
        {/if}
    {/if}
    <Error name={error} />
</label>