FROM node:22-alpine AS base

# pnpm setup
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Required for healthcheck
RUN apk --no-cache add curl

WORKDIR /app

FROM base AS build

COPY backend/ /app/backend
COPY e2e/ /app/e2e
COPY frontend/ /app/frontend
COPY package.json /app
COPY pnpm-*.yaml /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts

RUN pnpm run --filter=backend build
RUN pnpm deploy --filter=backend --prod /prod/backend

RUN pnpm run --filter=frontend build
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM base AS backend

COPY --chown=node:node --from=build /prod/backend/dist dist
COPY --chown=node:node --from=build /prod/backend/node_modules node_modules
USER node

CMD [ "node", "dist/main" ]

FROM nginx:1.25.3-alpine AS frontend

COPY ./frontend/nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /prod/frontend/dist/browser /usr/share/nginx/html/

FROM mcr.microsoft.com/playwright:v1.45.1-jammy AS e2e

WORKDIR e2e
COPY e2e /e2e
RUN npm i

CMD ["npm", "run", "e2e:ci"]
