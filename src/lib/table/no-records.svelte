<script lang="ts">
    interface Props {
        colspan: number;
        message?: string;
    }

    let { colspan, message = 'Nenhum registro encontrado' }: Props = $props();
</script>

<tr class="hover-disabled">
    <td {colspan}>{message}</td>
</tr>
