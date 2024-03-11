<script lang="ts">
    import { ProfileLayoutComponent, title } from "$lib";
    import { user } from "$lib/auth";
    title('Perfil');
    let form: Record<string, any> = {
        name: user.get('user').name,
        email: user.get('user').email,
    }
</script>

<ProfileLayoutComponent bind:form />

