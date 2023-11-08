<script lang="ts">
    import icon from "../icons/pen.svg?raw";
    import { Link } from "../../link";
    export let href: string;
</script>

<Link {href} class="edit" title="editar registro">
    {@html icon}
</Link>