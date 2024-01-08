# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 as base
WORKDIR /usr/app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
RUN mkdir -p /temp/dev
COPY ../../package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY ../../package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# copy production dependencies and source code into final image
FROM base AS release
COPY ../../src ./src
COPY ../../package.json .
COPY ../../tsconfig.json .
COPY ../../bunfig.toml .
COPY --from=install /temp/prod/node_modules node_modules

# run the app
USER bun
EXPOSE 8000/tcp
ENTRYPOINT ["bun", "run-migrations-and-start" ]
