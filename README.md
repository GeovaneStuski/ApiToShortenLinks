Para rodar o projeto, primeiramente precisa baixar as dependências do projeto, usando "npm install" ou caso esteja usando yarn "yarn".
Depois o criar um arquivo .env no diretório para adicionar as variaveis de ambiente sendo elas:

PORT=3000
HOST=localhost

DATABASE_NAME="nome da database"
DATABASE_USER="user da database"
DATABASE_PASSWORD="senha da database"
DATABASE_PORT=5432

SECRET_KEY="key para assinar e verificar os tokens de acesso"

Após isso subir o banco de dados com o docker usando "docker-compose up -d". sendo assim apenas inicie o servidor usando "npx dev" ou "yarn dev"
