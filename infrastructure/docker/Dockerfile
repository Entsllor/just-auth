# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine
WORKDIR /usr/app

COPY ../../package.json .
COPY ../../bun.lockb .

RUN bun install --frozen-lockfile --production

COPY ../../src ./src
COPY ../../tsconfig.json .
COPY ../../bunfig.toml .

# run the app
USER bun
EXPOSE 8000/tcp
ENTRYPOINT ["bun", "run-migrations-and-start" ]
