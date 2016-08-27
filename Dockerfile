FROM ubuntu:16.10

RUN (apt-get -qq update && apt-get -qqy install cargo)
RUN mkdir /source
COPY Cargo.toml /source/
COPY Cargo.lock /source/
COPY src/ /source/src/
WORKDIR /source/
RUN cargo build --release

ENTRYPOINT ["/source/target/release/telectr"]
EXPOSE 3012
