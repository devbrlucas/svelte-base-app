<script>import { store } from "./store";
export let href;
const url = `${href}${$store[href] ?? ""}`;
function update() {
  store.update((value) => {
    delete value[href];
    return value;
  });
}
</script>

<a href={url} {...$$restProps} on:click={update}>
    <slot>
        Voltar
    </slot>
</a>