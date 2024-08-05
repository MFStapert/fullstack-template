ARG NODE_VERSION=node:22-alpine

FROM ${NODE_VERSION} AS cache

# setup pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# copy package.json files and pnpm config, then install dependencies with pnpm using cache
WORKDIR /app
COPY backend/package.json /app/backend/
COPY e2e/package.json /app/e2e/
COPY frontend/package.json /app/frontend/
COPY package.json /app
COPY pnpm-*.yaml /app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

FROM cache AS backend-build

COPY backend/ /app/backend
RUN pnpm run --filter=backend build
RUN pnpm deploy --filter=backend --prod /prod/backend

FROM ${NODE_VERSION} AS backend

# required for healthcheck
RUN apk --no-cache add curl

# add files as non-privileged user
WORKDIR /app
COPY --chown=node:node --from=backend-build /prod/backend/dist dist
COPY --chown=node:node --from=backend-build /prod/backend/node_modules node_modules
USER node

CMD [ "node", "dist/main" ]

FROM cache AS frontend-build

COPY frontend/ /app/frontend
RUN pnpm run --filter=frontend build
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM caddy:2-alpine AS frontend

COPY frontend/server/Caddyfile /etc/caddy/Caddyfile
COPY --from=frontend-build /prod/frontend/dist/browser /srv/

FROM mcr.microsoft.com/playwright:v1.45.1-jammy AS e2e

RUN corepack enable
WORKDIR /app
COPY package.json .
COPY --from=cache /app/node_modules /app/node_modules
COPY /e2e /app/e2e
COPY --from=cache /app/e2e/node_modules /app/e2e/node_modules

CMD ["pnpm", "--filter=e2e", "run", "e2e:ci"]
