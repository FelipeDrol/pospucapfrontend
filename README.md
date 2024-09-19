# MVP Envio de documentos

MVP para Disciplina **Desenvolvimento Back-end Avançado** 

![364550335-dd0d9c3d-becd-41f1-9a1d-dbc9e8c858de](https://github.com/user-attachments/assets/8c6e6753-5124-4bbe-aa9e-6b39e33c9c12)

O objetivo aqui é ilustrar um exemplo de frontend de um painel de usuário de envio de documentos. Tanto os dados quanto seus anexos.
O sistema irá aceitar qualquer e-mail válido para se logar.
Os inputs text irão aceitar qualquer texto.
Os anexos irão aceitar qualquer arquivo.
Ele chama as apis de dados pela porta 5000 e de documentos pela porta 5001. Os dados sao guardados como json e os anexos como base64. Tambem é chamado a API Viacep para validar o endereço.

### Instalação

Será necessário ter o [Nodejs, ou o npm,](https://nodejs.org/en/download/) instalado. 

Após clonar o repositório, é necessário ir ao diretório raiz desse projeto pelo terminal para poder executar os comandos descritos abaixo.

```
$ npm install
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `package.json`. Uma pasta chamada `node_modules` será criada.

### Executando o servidor

Para executar a interface basta executar o comando: 

```
$ npm start
```

### Acesso no browser

Abra o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.

## Como executar através do Docker

Certifique-se de ter o [Docker](https://docs.docker.com/engine/install/) instalado e em execução em sua máquina.

Navegue até o diretório que contém o Dockerfile e o requirements.txt no terminal.
Execute **como administrador** o seguinte comando para construir a imagem Docker:

```
$ docker build -t front-end .
```

Uma vez criada a imagem, para executar o container basta executar, **como administrador**, seguinte o comando:

```
$ docker run -p 3000:3000 front-end
```

Uma vez executando, para acessar a API, basta abrir o [http://localhost:3000/#/](http://localhost:3000/#/) no navegador.
