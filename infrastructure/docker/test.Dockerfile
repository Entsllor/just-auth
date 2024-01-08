# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:alpine
WORKDIR /usr/app

COPY package.json .
COPY bun.lockb .
COPY bunfig.toml .

RUN bun install --frozen-lockfile

COPY src ./src
COPY tests ./tests
COPY package.json .
COPY tsconfig.json .
COPY .env.test .

# run the app
USER bun
EXPOSE 8000/tcp
ENTRYPOINT ["bun", "test" ]
