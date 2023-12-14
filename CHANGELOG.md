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
