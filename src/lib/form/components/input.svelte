<script lang="ts">
    import Error from "./error.svelte";
    type Type = 
        'password' |
        'number' |
        'email' |
        'text' |
        'tel' |
        'date' |
        'datetime-local' |
        'search' |
        'file' |
        'color';

    export let type: Type
    export let label: string;
    export let value: string | number | FileList | File | undefined | null;
    export let error: string = '';
    export let disabled: boolean = false;
    let passwordVisible: boolean = false;
    let passowrdInput: HTMLInputElement | undefined;
    function handleInputFileChange(event: Event): void
    {
        const input = event.currentTarget as HTMLInputElement;
        if (!input.files) {
            value = null;
            return;
        }
        if (input.files.length === 0) {
            value = null;
        } else {
            value = input.multiple ? input.files : input.files[0];
        }
    }
    function togglePasswordVisibility(): void
    {
        passwordVisible = !passwordVisible;
        if (!passowrdInput) return;
        passowrdInput.type = passwordVisible ? 'text' : 'password';
    }
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="app input-component" class:disabled>
    <span>
        {label}
        {#if type === 'password'}
            <button type="button" on:click={togglePasswordVisibility} class="toggle-password" class:visible={passwordVisible}>
                <svg class="visible" xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z"></path></svg>
                <svg class="invisible" xmlns="http://www.w3.org/2000/svg" height="16" width="20" viewBox="0 0 640 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zm151 118.3C226 97.7 269.5 80 320 80c65.2 0 118.8 29.6 159.9 67.7C518.4 183.5 545 226 558.6 256c-12.6 28-36.6 66.8-70.9 100.9l-53.8-42.2c9.1-17.6 14.2-37.5 14.2-58.7c0-70.7-57.3-128-128-128c-32.2 0-61.7 11.9-84.2 31.5l-46.1-36.1zM394.9 284.2l-81.5-63.9c4.2-8.5 6.6-18.2 6.6-28.3c0-5.5-.7-10.9-2-16c.7 0 1.3 0 2 0c44.2 0 80 35.8 80 80c0 9.9-1.8 19.4-5.1 28.2zm51.3 163.3l-41.9-33C378.8 425.4 350.7 432 320 432c-65.2 0-118.8-29.6-159.9-67.7C121.6 328.5 95 286 81.4 256c8.3-18.4 21.5-41.5 39.4-64.8L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5zm-88-69.3L302 334c-23.5-5.4-43.1-21.2-53.7-42.3l-56.1-44.2c-.2 2.8-.3 5.6-.3 8.5c0 70.7 57.3 128 128 128c13.3 0 26.1-2 38.2-5.8z"></path></svg>
            </button>
        {/if}
    </span>
    {#if type === 'password'}
        <input type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur bind:this={passowrdInput} />
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
    {:else if type === 'search'}
        <input type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'color'}
        <input type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'datetime-local'}
        <input type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'file'}
        <input type="file" autocomplete="off" {...$$restProps} {disabled} on:input on:blur on:change={handleInputFileChange} />
        {#if value == null}
            <span>Nenhum arquivo selecionado</span>
        {:else if value instanceof File}
            <span>{value.name}</span>
        {:else if value instanceof FileList}
            {#each value as file}
                <span>{file.name}</span>
            {/each}
        {/if}
    {/if}
    <Error name={error} />
</label>