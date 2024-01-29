#!/bin/sh

#* Acessar a pasta backend e executar npm run dev
cd backend
npm run dev &

#? A adição de '&' após o comando npm run dev no backend faz com que ele seja executado em segundo plano, permitindo que o script continue imediatamente para a parte do frontend.

#* Voltar para a pasta principal
cd ..

#* Aguarda um curto período de tempo para garantir que o backend tenha inicializado
sleep 5

#* Acessar a pasta frontend e executar npm run dev
cd frontend
npm run dev
