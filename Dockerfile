ARG NODE_VERSION=node:22-alpine

FROM ${NODE_VERSION} AS build

# setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# install java for frontend client generator
RUN  apk update \
  && apk upgrade \
  && apk add --update openjdk11 tzdata curl unzip bash \
  && rm -rf /var/cache/apk/*

# copy package.json files and pnpm config
WORKDIR /app
COPY backend/package.json /app/backend/
COPY e2e/package.json /app/e2e/
COPY frontend/package.json /app/frontend/
COPY package.json /app
COPY pnpm-*.yaml /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

# build
COPY backend/ /app/backend
RUN pnpm run --filter=backend build
RUN pnpm deploy --filter=backend --prod /prod/backend
COPY frontend/ /app/frontend
RUN pnpm run --filter=frontend build
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM ${NODE_VERSION} AS backend

# required for healthcheck
RUN apk --no-cache add curl
HEALTHCHECK --interval=5s --timeout=1s --retries=10 \
 CMD curl --fail http://127.0.0.1:8080/healthcheck || exit 1

# add files as non-privileged user
WORKDIR /app
COPY --chown=node:node --from=build /prod/backend/dist dist
COPY --chown=node:node --from=build /prod/backend/node_modules node_modules
COPY --chown=node:node /backend/migrations migrations
USER node

CMD [ "node", "dist/src/main" ]

FROM caddy:2-alpine AS frontend

COPY frontend/server/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /prod/frontend/dist/browser /srv/

FROM mcr.microsoft.com/playwright:v1.45.1-jammy AS e2e

RUN corepack enable
WORKDIR /app
COPY package.json .
COPY --from=build /app/node_modules /app/node_modules
COPY /e2e /app/e2e
COPY --from=build /app/e2e/node_modules /app/e2e/node_modules

CMD ["pnpm", "--filter=e2e", "run", "e2e:ci"]
