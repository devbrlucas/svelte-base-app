<script>import { Ajax } from "../ajax";
import { Input } from "../form";
import { messages } from "../messages";
import { confirmation } from "../confirmation";
export let name;
export let email;
export let url = "/users/self";
export let callback = void 0;
let password = "";
let password_confirmation = "";
let image;
async function update() {
  if (callback) {
    callback();
  } else {
    const response = await Ajax.post(url).setOption("convertToFormData", true).send("none", {
      name,
      email,
      image,
      password,
      password_confirmation
    });
    if (response.error)
      return;
    messages.success("Dados editados com sucesso");
    image = null;
    password = password_confirmation = "";
  }
}
const action = {
  callback: update,
  message: "Deseja editar o seu perfil de usu\xE1rio?"
};
</script>

<main id="app-main">
    <h1>Meu Perfil</h1>
    <form id="form" use:confirmation={action}>
        <Input type="text" label="Nome" error="name" bind:value={name} required size=60 />
        <br>
        <Input type="email" label="E-Mail" error="email" bind:value={email} required size=60 />
        <br>
        <Input type="file" label="Imagem" error="image" bind:value={image} />
        <br>
        <Input type="password" label="Senha" error="password" bind:value={password} size=40 />
        <Input type="password" label="Confirmação da senha" error="password_confirmation" bind:value={password_confirmation} size=40 />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
</aside>
