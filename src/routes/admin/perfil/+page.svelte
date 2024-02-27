<script lang="ts">
    import { ProfileLayoutComponent, title } from "$lib";
    import { user } from "$lib/auth";
    import { Input } from "$lib/form";
    title('Perfil');
    let form: Record<string, any> = {
        name: user.get('user').name,
        email: user.get('user').email,
        phone: user.get('user').phone,
    }
</script>

<ProfileLayoutComponent bind:form>
    <br>
    <Input type="number" label="Telefone" bind:value={form.phone} required error="" />
</ProfileLayoutComponent>

