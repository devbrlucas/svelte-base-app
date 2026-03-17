<script lang="ts">
    import icon from "../icons/plus.svg?raw";
    import { Link } from "../../link";
    interface Props {
        href: string;
    }

    let { href }: Props = $props();
</script>

<Link {href} class="show" title="visualizar registro">
    {@html icon}
</Link>