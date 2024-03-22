npm run build site
docker build `
  -t site `
  --build-arg="BUILD_FOLDER=site" `
  .
