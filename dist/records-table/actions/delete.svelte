<script>import { Ajax } from "../../ajax";
import { messages } from "../../messages";
import icon from "../icons/xmark.svg?raw";
import { confirmation } from "../../confirmation";
export let href;
export let callback;
async function destroy() {
  const response = await Ajax.delete(href).send("none");
  if (response.error)
    return;
  const result = await callback(response.response);
  if (result)
    messages.success("Registro exclu\xEDdo com sucesso");
}
const action = {
  callback: destroy,
  message: "Deseja excluir o registro selecionado?"
};
</script>

<a {href} class="delete" title="desativar registro" use:confirmation={action}>
    {@html icon}
</a>