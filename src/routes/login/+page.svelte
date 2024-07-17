<script lang="ts">
    import { AuthComponent, user } from "$lib/auth";
    import { title } from "$lib";
    import { goto } from "$app/navigation";
    title('Login');
    if (user.get('access_token')) goto('/admin/dashboard');
</script>
<AuthComponent passwordReset={true} />