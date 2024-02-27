<script lang="ts">
    import { AuthComponent, user, UserNotFoundError } from "$lib/auth";
    import { title } from "$lib";
    import { goto } from "$app/navigation";
    title('Login');
    try {
        if (user.get('access_token')) goto('/admin/dashboard');
    } catch (error) {
        if (!(error instanceof UserNotFoundError)) throw error;
    }
</script>
<AuthComponent passwordReset={true} />