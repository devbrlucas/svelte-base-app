<script lang="ts">
    import { Input, SelectionBox } from "../form";
    import { MessagesComponent } from "../messages";
    import "./style.less";
    export let callback: () => Promise<void>;
    export let email: string;
    export let password: string;
    export let remember: boolean;
</script>

<main id="login-page">
    <h1>
        <span>Login</span>
        <img src="/logo.png" alt="logo da empresa">
    </h1>
    <form on:submit|preventDefault={callback} id="form">
        <Input type="email" label="E-Mail" bind:value={email} error="email" required size="40" />
        <br>
        <Input type="password" label="Senha" bind:value={password} error="password" required size="40" />
        <br>
        <SelectionBox type="checkbox" label="Manter conectado" bind:checked={remember} error="remember" />
    </form>
    <button type="submit" form="form" class="highlighted">
        Acessar
    </button>
</main>
<MessagesComponent />
