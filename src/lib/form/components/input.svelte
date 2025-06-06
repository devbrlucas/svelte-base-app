<script lang="ts" generics="P">
    import type { Action } from "svelte/action";
    import Error from "./error.svelte";
    import LabelInfo from "./label-info.svelte";
    import { uploadIcon, xmarkIcon } from "$lib/icons";
    import { onMount } from "svelte";
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
        'time' |
        'color';

    export let type: Type
    export let label: string = '';
    export let value: string | number | undefined | null = null;
    export let file: FileList | File | null = null;
    export let error: string = '';
    export let disabled: boolean = false;
    export let required: boolean = false;
    export let action: Action<HTMLElement, P | undefined> | undefined = undefined;
    export let actionOptions: P | undefined = undefined;
    export let clearCallback: ((event: Event) => void | Promise<void>) | undefined = undefined;
    const id = `input-${Math.random() * 5}`;
    let files: FileList | null = null;
    $: {
        const input = document.querySelector<HTMLInputElement>(`input[id="${id}"]`);
        if (files && input) file = input.multiple ? files : files.item(0);
    }
    function clearSelectedFiles(event: Event): void
    {
        const input = document.querySelector<HTMLInputElement>(`input[id="${id}"]`);
        if (file && input) {
            files = null;
            file = null;
            input.value = '';
        } else {
            clearCallback?.(event);
        }
    }
    onMount(() => {
        if (type === 'file' && file) {
            const input = document.querySelector<HTMLInputElement>(`input[id="${id}"]`);
            if (input) {
                if (file instanceof FileList) input.files = file;
                if (file instanceof File) {
                    const data = new DataTransfer;
                    data.items.add(file);
                    input.files = data.files;
                }
            }
        }
    });
    function ondragover(event: Event): void
    {
        event.preventDefault();
        const container = event.currentTarget as HTMLElement;
        const input = container.querySelector('input');
        if (input?.type !== 'file') return;
        !container.classList.contains('dragover') && container.classList.add('dragover');
    }
    function ondragleave(event: Event): void
    {
        event.preventDefault();
        const container = event.currentTarget as HTMLElement;
        const input = container.querySelector('input');
        if (input?.type !== 'file') return;
        container.classList.contains('dragover') && container.classList.remove('dragover');
    }
    function ondrop(event: DragEvent): void
    {
        event.preventDefault();
        const container = event.currentTarget as HTMLElement;
        const input = container.querySelector('input');
        if (input?.type !== 'file') return;
        if (!input) throw new ReferenceError('<input type="file"> not found on drop handler');
        container.classList.contains('dragover') && container.classList.remove('dragover');
        if (!event.dataTransfer) return;
        input.files = event.dataTransfer.files;
        files = event.dataTransfer.files;
    }
</script>

<div class="app input-component" class:disabled class:info={$$slots.default} class:required class:file={type === 'file'} class:fileselected={Boolean(file)} on:dragover={ondragover} on:dragleave={ondragleave} role="form" on:drop={ondrop}>
    {#if type !== 'file' && label}
        {#if $$slots.default}
            <LabelInfo {id} {label}>
                <slot></slot>
            </LabelInfo>
        {:else}
            <LabelInfo {id} {label} />
        {/if}
    {/if}
    {#if type === 'password'}
        {#if action}
            <input {id} type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'number'}
        {#if action}
            <input {id} type="number" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="number" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'email'}
        {#if action}
            <input {id} type="email" bind:value autocomplete="off" {...$$restProps} {disabled} on:input use:action={actionOptions} {required} />
        {:else}
            <input {id} type="email" bind:value autocomplete="off" {...$$restProps} {disabled} on:input {required} />
        {/if}
    {:else if type === 'text'}
        {#if action}
            <input {id} type="text" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="text" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'tel'}
        {#if action}
            <input {id} type="tel" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="tel" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'date'}
        {#if action}
            <input {id} type="date" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="date" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'month'}
        {#if action}
            <input {id} type="month" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="month" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'search'}
        {#if action}
            <input {id} type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'color'}
        {#if action}
            <input {id} type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'datetime-local'}
        {#if action}
            <input {id} type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'time'}
        {#if action}
            <input {id} type="time" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur use:action={actionOptions} {required} />
        {:else}
            <input {id} type="time" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur {required} />
        {/if}
    {:else if type === 'file'}
        {#if action}
            <input {id} type="file" autocomplete="off" {...$$restProps} {disabled} bind:files on:input on:blur on:change use:action={actionOptions} {required} aria-label={label} />
        {:else}
            <input {id} type="file" autocomplete="off" {...$$restProps} {disabled} bind:files on:input on:blur on:change {required} aria-label={label} />
        {/if}
        <span class="icon">
            {@html uploadIcon}
        </span>
        {#if file == null}
            <label for={id}>{label}</label>
        {:else if file instanceof File}
            <label for={id}>{file.name}</label>
        {:else if file instanceof FileList}
            <ol>
                {#each file as _file}
                    <li>{_file.name}</li>
                {/each}
            </ol>
        {/if}
        {#if clearCallback || file}
            <button type="button" class="circle red" title="limpar arquivos selecionados" on:click={clearSelectedFiles}>
                {@html xmarkIcon}
            </button>
        {/if}
    {/if}
    <Error name={error} />
</div>