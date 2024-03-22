npm run build cms
docker build `
  -t cms `
  --build-arg="BUILD_FOLDER=cms" `
  .
