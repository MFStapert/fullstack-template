FROM node:22.4.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build

COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run -r build
RUN pnpm deploy --filter=backend --prod /prod/backend
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM base AS backend

RUN apt-get update && apt-get install curl -y

COPY --from=build /prod/backend ./app
WORKDIR /app

EXPOSE 8080

CMD [ "node", "dist/main" ]

FROM nginx:1.25.3-alpine AS frontend

COPY ./frontend/nginx/nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /prod/frontend/dist/browser /usr/share/nginx/html/

FROM mcr.microsoft.com/playwright:v1.45.1-jammy as e2e
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install dependencies
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Set the entry point for the container
CMD ["pnpm", "--filter=e2e", "run", "e2e:ci"]
