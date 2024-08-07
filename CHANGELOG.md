# CHANGELOG

## [1.2.25] - 2024-07-17

### Modificações

- A interface `SvelteBaseApp.CurrentUser` agora não tem mais a propriedade `type`, sa propriedades padrão são `current` (usuário logado atualmente) e `access_token` (token de acesso à API)
- Na interface `SvelteBaseApp.CurrentUser`, os tipos dos usuários são definidos como propriedades; se eu tenho um usuário com `type = 'master'`, basta adicionar a propriedade `master` na interface com o seu respectivo tipo

## [1.2.24] - 2024-07-05

### Modificações

- Nos campos de formulário `svelte-base-app/form` agora o prop `label` não é obrigatória, e se não for informada, não será gerado o código HTML correspondente

## [1.2.23] - 2024-06-25

### Modificações

- No `<ProfileLayoutComponent>`, agora existem dois slot: o `form`, utilizado para adicionar campos no formulário e o `buttons` para adicionar os botões no topo da janela

## [1.2.22] - 2024-06-04

### Modificações

- No `<DialogComponent>`, agora ele não é mais fechado quando houver navegação

### Adições

- Adicionada exportação do tipo `PaginatedResponse`

## [1.2.21] - 2024-05-31

## Adições

- Adicionado no componente `<Input>` o `type=time`

## Correções

- Corrigido o `<TextArea>` que não exibia a mensagem de obrigatório
- Corrigido o formulário padrão no `<ProfileLayoutComponent>` que não estava alterando as imagens de perfil

## [1.2.20] - 2024-04-19

### Modificações

- Ao utilizar `<Input type=file multiple>`, a prop `file` irá receber `File[]` ao invés de `FileList`
- A prop `links` foi removida do componente `<Pagination>` e do tipo `PaginatedResponse`
- No componente `<Input>` em `/form`, foi adicionada a prop `clearCallback`; ela é vinculada ao `<Input type=file>` e indica uma função que será executada ao clicar no botão de fechar quando o `<input>` estiver vazio
- No `<LayoutComponent>`, quando a janela de instalação for fechada manualmente, ela ficará oculta durante um dia, e só depois desse tempo será exibida novamente

## [1.2.19] - 2024-04-12

### Modificações

- Em `dialog.open()`, agora o retorno quando a janela for fechada será do tipo `undefined` (tanto pela tecla `Esc`, botão de fechar ou `dialog.close()`)
- `dialog.open()` agora suporta chamar o método mesmo com outra janela aberta (a última será sempre a visível acima); as funções `dialog.close()` e `dialog.resolve()` irão utilizar sempre a janela, ou seja, o última que foi adicionada

## [1.2.18] - 2024-04-10

### Correções

- Correção em `service-worker` da função que manipula o evento `install` (estava adicionando ao cache duas vezes)

### Modificações

- Adicionado suporte para o erro `TypeError` no manipulador do evento `fetch` em `service-worker` para que seja retornada página de cache offline
- Alterado o mecanismo de geração do QR Code (agora utiliza o pacote NPM `qrcode`)

## [1.2.17] - 2024-03-28

### Correções

- O container do  `<DialogComponent>` não estava rolando ao fazer overflow

## [1.2.16] - 2024-03-28

### Correções

- Ao abrir um modal com `dialog.open()`, ao navegar entre páginas, o modal ficava aberto (agora ele é fechado)

## [1.2.15] - 2024-03-28

### Modificações

- Alterado o funcionamento e formato do `<Input type=file>`
- Adição de slots para personalização no `<AuthComponent>` e `<ResetPasswordComponent>`
- No `<AuthComponent>`, a prop `successURL` agora também pode receber uma função que retorna a URL de redirecionamento
- Nos elementos com a classe `circle`, haviam as classes `add` e `remove`, utilizadas para escolher as cores. Essas foram substituídos por `green` e `red` respectivamente

## [1.2.14] - 2024-03-18

- Correção no `<SelectionBox>` ao utilizar `type="checkbox"` e `bind:group`: agora é necessário informar a prop `key` caso tenha mais de um array pra fazer o bind

### Correções

## [1.2.13] - 2024-03-17

### Modificações

- Adicionada prop `successURL` para alterar a URL de redirecionamento após login no `<AuthComponent>`
- Adicionado slot no `<AuthComponent>` para adicionar campos no form
- Adicionado slot `info` e `form` no `<PasswordResetComponent>` para alterar a mensagem e adicionar campos no form respectivamente

## [1.2.12] - 2024-03-11

### Correções

- Correção do componente `<PasswordResetComponent>`

## [1.2.11] - 2024-03-11

### Correções

- Correção do componente `<PasswordResetComponent>`

## [1.2.10] - 2024-03-11

### Modificações

- Adição das propos `tokenRequestURL` e `tokenValidationURL` no componente `<PasswordResetComponent>`

## [1.2.9] - 2024-03-08

### Correções

- Correção nos elementos HTML do `form` que não estava adicionando o atributo `required` na última atualização

## [1.2.9] - 2024-03-08

### Adições

- Adicionada prop `required` nos componentes do export `form`, fazendo com que seja adicionada uma mensagem de campo obrigatório

### Correções

- Correção da tipagaem da prop `action` nos components do export `form`

## [1.2.7] - 2024-03-07

### Modificações

- Adição de suporte as `action` do Svelte nos componentes exportados no `form`

## [1.2.6] - 2024-03-06

### Modificações

- Em `<Table>` foi adicionada a prop opcional `full`, que faz com que a tabela ocupe todo o espaço dentro do container
- No `<Pagination>` foi adicionado o número da página atual, sendo que ele é um seletor podendo navegar entre as páginas

## [1.2.5] - 2024-02-29

### Correções

- No `<ProfileLayoutComponent>` foi corrigido o erro que deslogava do sistema ao atualizar o perfil usando a callback padrão

## [1.2.4] - 2024-02-28

### Modificações

- Adicionado overload na função `title`: ao usar ela sem parâmetros, a respectiva store é retornada
- No `<AuthComponent>` foram removidas as props `email`, `password` e `remember` e adicionada a prop `form` (sendo um objeto contendo as três props anteriores)
- No `<AuthComponent>` foi adicionada a prop `url` para casos onde é preciso alterar apenas a URL da requisição de login

## [1.2.3] - 2024-02-27

### Correções
- No export `user` de `svelte-base-app/auth`, agora não é preciso informar o parâmetro `remember` no método `set`
- No `<FilterComponent>` foi adicionada uma prop opcional chamada `callback`, ela recebe uma função que é chamada após realizar o processamento do filtro
- Na classe `Ajax` foi adicionado o suporte ao header `App-Current-User` para atualizar os dados do usuário logado a cada requisição

## [1.2.2] - 2024-02-22

### Correções
- Na classe `Ajax` a mensagem padrão do status 403 não estava sendo exibida caso fosse retornada uma mensagem vazia
- Ao clicar em um link de navegação do menu, a função `invalidateAll()` é chamada se o link do menu for o mesmo da página atual
- Na paginação, o campo items por página não era redefinido ao remover o parâmetro `items` da url

## [1.2.1] - 2024-02-15

### Correções

- Corrigidos problemas no `<SelectionBox>` ao utilizar `type="checkbox"` e `bind:group` com arrays

## [1.2.0] - 2024-02-15

### Modificações

- Adição da prop `passwordReset` no componente `<AuthComponent>` que informa se deve ou não exibir o link de redefinição de senha
- Os componentes do export `form` agora podem receber um slot default que irá gerar um ícone para exibir informações sobre aquele campo (para o `<Select>`, o slot terá o nome `info`)
- Alterações no componente `<SelectionBox>`: quando for o tipo `radio`, agora será utilizado o `bind:group` ao invés de `bind:selected` (esse último foi removido)

### Adições

- Adição do componente `<PasswordResetComponent>` no export `auth` que traz um layout padrão para redefinição de senha por e-mail

## [1.1.3] - 2024-02-12

### Modificações

- No export `form/Input`, foi adicionada a prop `file`, utilizada quando `type="file"` (ajuste para melhoria na tipagem)
- No export `form/Input`, a prop `value` agora não tem mais os tipos `File` e `FileList`
- Corrigido problema no `<Table>` onde ao gerar o título mobile (`<b></b>`) algum elementro HTML dentro da célula não é mantido

## [1.1.2] - 2024-02-05

### Correções

- Correção dos estilos referentes ao `<aside id="app-aside">` que ficavam estourando no mobile
- Correção da tipagem em `<SelectionBox>` que não permitia valores do tipo `boolean`
- Ajuste no módulo `service-worker` para carregar a página inicial ao fazer a navegação completa dentro do app

## [1.1.1] - 2024-02-01

### Modificações

- No componente `<Table>` foi adicionada a prop `pagination` para gerar o componente `<Pagination>` junto com a tabela, tirando a necessidade de importar a paginação
- No `<ProfileLayoutComponent>`, agora pode ser feito o `bind:form`, que receberá todos os dados do formulário; também foi adicionado um `<slot>` para adicionar campos personalizados

## [1.1.0] - 2024-01-26

### Adições

- Adição do export `qrcode`: nele é possível gerar e ler um QR Code, também é possível fechar o leitor
- Adição do export `QRCodeReaderComponent`: é o responsável por exibir o leitor do QR Code (`QRCodeReaderComponent` e `qrcode` devem ser usados em conjunto)

## [1.0.1] - 2024-01-23

### Correções

- Corrigido problema no componente `<Table>` onde ao atualizar o corpo da tabela não eram adicionas as descrições para o mobile
- Corrigido problema no componente `<Table>` onde às vezes acontecia de gerar a descrição para mobile mais de uma vez, gerando dados duplicados dentro da tabela
- Corrigido o ícone de fechar no componente `<DialogComponent>` que ficava esticado quando o título tinha mais de uma linha

### Adições

- Adicionado classe `button.circle` para estilizar botões redondos com ícones centralizados (há algumas opções de cores pré-definidas)

## [1.0.0] - 2024-01-23

- Versão inicial