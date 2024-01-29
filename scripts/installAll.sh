#!/bin/sh

#* Acessar a pasta backend e executar npm install
cd backend
npm install &

#? A adição de '&' após o comando npm install no backend faz com que ele seja executado em segundo plano, permitindo que o script continue imediatamente para a parte do frontend.

#* Voltar para a pasta principal
cd ..

#* Aguarda um curto período de tempo para garantir que o backend tenha instalado todas as dependências
sleep 30

#* Acessar a pasta frontend e executar npm install
cd frontend
npm install
