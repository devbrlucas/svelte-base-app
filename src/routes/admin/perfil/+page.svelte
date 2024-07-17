<script lang="ts">
    import { ProfileLayoutComponent, title } from "$lib";
    import { currentUser } from "$lib/auth";
    title('Perfil');
    let form: Record<string, any> = {
        name: $currentUser.user.name,
        email: $currentUser.user.email,
    }
</script>

<ProfileLayoutComponent bind:form />

