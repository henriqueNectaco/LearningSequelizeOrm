para rodar ambiente mysql local
sudo docker-compose up -d

para rodar projeto via container:
sudo docker build -t nomeimagem .
sudo docker run -p 4000:4000 nomeimagem