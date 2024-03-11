# CHANGELOG

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