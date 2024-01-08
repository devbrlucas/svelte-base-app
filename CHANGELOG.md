# CHANGELOG

## [1.0.0] - 2023-11-08

- Versão inicial

## [1.0.1] - 2023-12-14

### Modificações

- Adicionado novo tipo de retorno `basic-json` em `Ajax.send()` (o tipo genérico informado em `Ajax.send()` não encapsulado dentro de uma atributo `data`)
- Adicionada nova opção `dontUseBaseURL` em `Ajax.setOption()` (se `true`, não usa a URL base informada no arquivo `.env`)
- Agora o link exibido nas opções `tableActions.delete` e `tableActions.restore` será o mesmo da página atual, a prop `href` será utilizada apenas na requisição Ajax
- Adicionada propriedade `deniedCallback` no tipo `ConfirmationProperties` em `confirmation` (agora é possível adicionar uma callback para ser executada caso seja selecionada a opção **Não** na janela de confirmação)
- Adicionado recurso no componente `AdminLayoutComponent` para marcar o menu de navegação ativo
- No componente `AuthComponent` a função de login padrão agora redireciona para `/admin/dashboard`, não mais para `/admin`

## [1.0.2] - 2023-12-20

### Modificações

- Na classe `Ajax`, ao realizar uma requisição `GET`, você pode informar a query string como objeto ou `FormData` no método `Ajax.send()` que a query string será gerada automaticamente. Exemplo: `Ajax.get(<url>).send('json', queryStringAsObjectOrFormData)`

### Adições

- Adicionado `svelte-base-app/filter` que exporta componentes e funções comuns para filtros

## [2.0.0] - 2023-12-27

### Modificações

- Atualizações das dependências para o novo [SvelteKit@2](https://kit.svelte.dev/docs/migrating-to-sveltekit-2)
- Corrigido problema que mantinha o componente `FilterComponent` em `svelte-base-app/filter` aberto ao navegar entre as páginas
- Adicionada opção `disableRedirects` em `Ajax.setOption()` para desabilitar os redireconamentos internos feitos ao tratar a resposta
- Adicionada função `title()` para modificar o título da página de maneira mais simples (no componente `LayoutComponent` agora é obrigatório informar o título base: _prop_ `baseTile`)
- Nas respostas retornadas pela chamada em `Ajax.send()` agora tem o método `AjaxResponse.throwHttpError()` que lança um erro utilizando a função `error()` do **SvelteKit**
- Adicionado `type="month"` no `Input` exportado em `svelte-base-app/form`

### Adições

- Adicionada função `createFormDataFromObject()` em `svelte-base-app`

## [2.0.1] - 2024-01-08

### Correções

- Corrigido o problema que não gerava a query string em `Ajax.get()`
- Corrigido problema em que a listagem não é atualizada quando os campos não são atualizados em `FilterComponent`
