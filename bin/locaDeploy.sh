echo 'start';
yarn build &&
docker build -t cw/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 3000:3000 -d cw/node-web-app &&
echo 'OK!'
