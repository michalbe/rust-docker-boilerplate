FROM rust:builder

FROM alpine:latest
COPY --from=0 /app/ /app/
COPY ./Rocket.toml /app/

WORKDIR /app

CMD ["./ov-api"]
