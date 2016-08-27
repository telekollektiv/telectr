FROM ubuntu:16.04

# setup rust manually until recent packages are in the repos
RUN (apt-get -qq update && apt-get -qqy install curl tar gzip gcc shared-mime-info)
RUN (mkdir /home/rust && cd /home/rust)
RUN export LD_LIBRARY_PATH=${LD_LIBRARY_PATH}:/usr/local/lib
RUN curl -O https://static.rust-lang.org/dist/rust-nightly-x86_64-unknown-linux-gnu.tar.gz
RUN tar xf rust-nightly-x86_64-unknown-linux-gnu.tar.gz
RUN ./rust-nightly-x86_64-unknown-linux-gnu/install.sh
RUN curl -O https://static.rust-lang.org/cargo-dist/cargo-nightly-x86_64-unknown-linux-gnu.tar.gz
RUN tar xf cargo-nightly-x86_64-unknown-linux-gnu.tar.gz
RUN ./cargo-nightly-x86_64-unknown-linux-gnu/install.sh
RUN (rm -rf rust-nightly-x86_64-unknown-linux-gnu/ && rm -rf cargo-nightly-x86_64-unknown-linux-gnu/)

# compile actual application
RUN mkdir /source
COPY Cargo.toml /source/
COPY Cargo.lock /source/
COPY src/ /source/src/
WORKDIR /source/
RUN cargo build --release
ENTRYPOINT ["/source/target/release/telectr"]
EXPOSE 3012
