# telectr [![travis][travis-image]][travis-url]

[travis-image]: https://img.shields.io/travis/telekollektiv/telectr.svg
[travis-url]: https://travis-ci.org/telekollektiv/telectr

A web based (+/-1) increase/decrease (person) counter which collects counts from multiple interfaces and summarizes them in one place (somehow)

## How to start the server

Start an http server inside `contrib/`, then compile the server with `cargo run`.

```
$ (cd contrib/; python3 -m http.server --bind 127.0.0.1 8000) &
$ cargo run
   Compiling bitflags v0.4.0
   Compiling winapi v0.2.8
   Compiling unicode-normalization v0.1.2
   Compiling httparse v1.1.2
   Compiling cfg-if v0.1.0
   Compiling redis v0.7.0
   Compiling matches v0.1.2
   Compiling log v0.3.6
   Compiling bytes v0.3.0
   Compiling winapi-build v0.1.1
   Compiling libc v0.2.15
   Compiling slab v0.1.3
   Compiling kernel32-sys v0.2.2
   Compiling ws2_32-sys v0.2.1
   Compiling nix v0.5.1
   Compiling time v0.1.35
   Compiling rand v0.3.14
   Compiling net2 v0.2.26
   Compiling miow v0.1.3
   Compiling unicode-bidi v0.2.3
   Compiling mio v0.5.1
   Compiling sha1 v0.2.0
   Compiling idna v0.1.0
   Compiling url v1.2.0
   Compiling ws v0.5.2
   Compiling telectr v0.1.0 (file:///.../telectr)
     Running `target/debug/telectr`
[*] starting (127.0.0.1:3012)...
```

## On the wire

`+test1` -> increase the `test1` counter by 1
`-test1` -> decrease the `test1` counter by 1
`_test1` -> get the current value of `test1` counter

## License

GPLv3

