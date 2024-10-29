<script lang="ts">
    import { AuthComponent, user } from "$lib/auth";
    import { title } from "$lib";
    import { goto } from "$app/navigation";
    title('Login');
    if (user.get('access_token')) goto('/admin/dashboard');
</script>
<AuthComponent passwordReset={true}>
    <svelte:fragment slot="fields">
        <p>Aqui vai um campo de texto</p>
    </svelte:fragment>
    <svelte:fragment slot="post-form">
        <p>Aqui vai um texto depois do formulário</p>
    </svelte:fragment>
    <svelte:fragment slot="inside-form">
        <p>Aqui vai um texto dentro do formulário</p>
    </svelte:fragment>
    <svelte:fragment slot="buttons">
        <br>
        <button type="button">Teste</button>
    </svelte:fragment>
</AuthComponent>