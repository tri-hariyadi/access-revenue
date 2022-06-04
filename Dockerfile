FROM mhart/alpine-node:14 AS builder
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --no-package-lock
RUN npm run build

FROM node:14.0.0
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
EXPOSE 3006
CMD ["serve", "-p", "3006", "-s", "."]