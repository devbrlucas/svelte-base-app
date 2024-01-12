<script lang="ts">
    export let colspan: number;
    export let message: string = 'Nenhum registro encontrado';
</script>

<tr class="hover-disabled">
    <td {colspan}>{message}</td>
</tr>
