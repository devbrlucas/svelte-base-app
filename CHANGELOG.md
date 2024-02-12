# CHANGELOG

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