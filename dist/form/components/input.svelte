<script>import Error from "./error.svelte";
export let type, label, value, error = "", disabled = false;
function handleInputFileChange(event) {
  const input = event.currentTarget;
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