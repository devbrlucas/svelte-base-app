<script>import { store } from "./store";
export let href;
function update() {
  const path = window.location.pathname;
  const query = window.location.search;
  store.update((value) => {
    value[path] = query;
    return value;
  });
}
</script>

<a {href} {...$$restProps} on:click={update} on:click>
    <slot />
</a>