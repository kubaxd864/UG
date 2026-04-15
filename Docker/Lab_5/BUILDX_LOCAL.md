docker run -d --restart unless-stopped -p 5001:5000 --name local-registry registry:2

docker ps --filter "name=local-registry"

docker buildx create --name multiarch --use --driver docker-container
docker buildx inspect --bootstrap
docker buildx ls

$REG = "localhost:5001"
$TAG = "lab5"

docker buildx build `  --platform linux/amd64,linux/arm64`
-t $REG/product-backend:$TAG `  -t $REG/product-backend:latest`
--push ./backend

docker buildx build `  --platform linux/amd64,linux/arm64`
-t $REG/product-frontend:$TAG `  -t $REG/product-frontend:latest`
--push ./frontend

docker network create product-net
docker rm -f product-backend product-frontend 2>$null
docker run -d --name product-backend --network product-net --restart unless-stopped $REG/product-backend:$TAG
docker run -d --name product-frontend --network product-net -p 8080:8080 --restart unless-stopped $REG/product-frontend:$TAG
