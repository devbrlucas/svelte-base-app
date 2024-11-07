<script lang="ts">
    import { AdminLayoutComponent } from "$lib";
</script>

<AdminLayoutComponent>
    <svelte:fragment slot="nav">
        <a href="/admin/dashboard">home</a>
        <a href="/admin/dialog">dialog</a>
        <a href="/admin/table">table</a>
        <a href="/admin/ajax">ajax</a>
        <a href="/admin/filter">filter</a>
        <a href="/admin/confirmation">confirmation</a>
        <a href="/admin/form">form</a>
        <a href="/admin/dashboard">inicio scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">scroll</a>
        <a href="/admin/dashboard">fim scroll</a>
    </svelte:fragment>
    <svelte:fragment slot="body">
        <slot></slot>
    </svelte:fragment>
</AdminLayoutComponent>
