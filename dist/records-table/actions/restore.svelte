<script>import { Ajax } from "../../ajax";
import { messages } from "../../messages";
import icon from "../icons/check.svg?raw";
import { confirmation } from "../../confirmation";
export let href;
export let callback;
async function destroy() {
  const response = await Ajax.delete(href).send("none");
  if (response.error)
    return;
  const result = await callback(response.response);
  if (result)
    messages.success("Registro restaurado com sucesso");
}
const action = {
  callback: destroy,
  message: "Deseja restaurar o registro selecionado?"
};
</script>

<a {href} class="restore" title="restaurar registro" use:confirmation={action}>
    {@html icon}
</a>