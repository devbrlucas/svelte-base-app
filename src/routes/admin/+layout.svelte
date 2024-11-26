<script lang="ts">
    import { AdminLayoutComponent, NavGroupedComponent } from "$lib";
</script>

<AdminLayoutComponent>
    <svelte:fragment slot="nav">
        <a href="/admin/dashboard">home</a>
        <a href="/admin/dialog">dialog</a>
        <a href="/admin/table">table</a>
        <a href="/admin/ajax">ajax</a>
        <a href="/admin/filter">filter</a>
        <a href="/admin/confirmation">confirmation</a>
        <a href="/admin/dashboard-init">inicio scroll</a>
        <NavGroupedComponent name="Sub 1">
            <a href="/admin/form">form</a>
            <a href="/admin/mensagens">messages</a>
            <a href="/admin/dashboard-sub1">scroll sub 1</a>
            <a href="/admin/dashboard-sub2">scroll sub 2</a>
            <a href="/admin/dashboard-sub3">scroll sub 3</a>
            <a href="/admin/dashboard-sub4">scroll sub 4</a>
        </NavGroupedComponent>
        <NavGroupedComponent name="Sub 2">
            <a href="/admin/dashboard-sub5">scroll sub 5</a>
            <a href="/admin/dashboard-sub6">scroll sub 6</a>
            <a href="/admin/dashboard-sub7">scroll sub 7</a>
            <a href="/admin/dashboard-sub8">scroll sub 8</a>
        </NavGroupedComponent>
        <a href="/admin/dashboard-end">fim scroll</a>
    </svelte:fragment>
    <svelte:fragment slot="body">
        <slot></slot>
    </svelte:fragment>
</AdminLayoutComponent>
