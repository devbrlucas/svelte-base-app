<script lang="ts">
    import icon from "../icons/pen.svg?raw";
    import { Link } from "../../link";
    interface Props {
        href: string;
    }

    let { href }: Props = $props();
</script>

<Link {href} class="edit" title="editar registro">
    {@html icon}
</Link>