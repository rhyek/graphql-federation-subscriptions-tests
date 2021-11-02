```bash
(cd apps/frontend; npm i)
(cd apps/nest-apps; npm i --legacy-peer-deps)
npm i
docker-compose -f infrastructure/docker-compose.yaml up -d
npm run dev
```
