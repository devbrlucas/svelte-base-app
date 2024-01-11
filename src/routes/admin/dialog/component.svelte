<script lang="ts">
    import { confirmation } from "$lib/confirmation";
    export let props: {name: string};
</script>

<h2>Olá {props.name}</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati voluptate ut aspernatur doloribus ea hic quis magnam. Corrupti quod minus eligendi, omnis, iste ullam, qui nemo tempore autem neque voluptate?</p>
<button type="button" use:confirmation={{callback: () => {}, message: 'Teste da mensagem'}}>Alerta</button>
