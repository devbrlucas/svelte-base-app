# CHANGELOG

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