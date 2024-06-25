<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Backend NestJS Marketplace

## Visão Geral
Este repositório contém a implementação do backend para um marketplace utilizando NestJS. O projeto está em andamento e visa fornecer uma solução robusta e escalável para o gerenciamento de um marketplace.

## Funcionalidades Implementadas

- **Autenticação JWT**: A aplicação retorna um token JWT, que é usado para autenticar e autorizar usuários nas rotas protegidas.
- **Controle de Acesso Baseado em Funções (RoleGuard)**: Implementado um guard para verificar o papel (Role) do usuário e garantir que ele tenha permissão para realizar determinadas ações.
- **Upload de Imagens**: Configurado o Multer para adicionar imagens aos produtos.
- **Envio de Email**: Configurado o Nodemailer para enviar emails, incluindo a funcionalidade de recuperação de senha através da rota de forget.
- **Decorators Personalizados**: Criados decorators para Role e User.
- **Testes**: Realizados testes iniciais para verificar se os controllers e services estão definidos corretamente.

## Instalação

1. **Clone o repositório:**
   ```bash
   $ git clone https://github.com/seu-usuario/backend-nestjs.git
   ```
2. **Navegue até o diretório do projeto:**
   ```bash
   $ cd backend-nestjs
   ```
3. **Instale as dependências:**
    ```bash
    $ npm install
    ```

## Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto e adicione suas variáveis de ambiente.

```env
DB_URL=sua_url_do_banco_de_dados
JWT_SECRET=seu_segredo_jwt
DB_HOST=seu_host_smtp
DB_PORT=sua_porta_smtp
DB_NAME=nome_do_banco_de_dados
DB_USERNAME=seu_usuario_smtp
DB_PASSWORD=sua_senha_smtp
```

## Executando a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentação da API

Acesse a documentação da API gerada pelo Swagger em http://localhost:3000/swagger/docs.


## Contribuição

Contribuições são bem-vindas! Por favor, siga as diretrizes no arquivo CONTRIBUTING.md.

## Licença

Licença MIT.
