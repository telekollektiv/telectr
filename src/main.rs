extern crate redis;
extern crate ws;

use redis::Client;
use ws::{ listen, Handler, Sender, Result, Message, CloseCode };
use std::env;

struct Server {
    out: Sender,
    sock: Client,
}

impl Handler for Server {
    fn on_message(&mut self, msg: Message) -> Result<()> {
        let txt = msg.as_text().unwrap();
        let sock = self.sock.get_connection().unwrap();

        let key = &txt[1..];

        let value = match txt.chars().next().unwrap() {
            '+' => {
                println!("inc {}", key);
                match redis::cmd("INCR").arg(key).query(&sock) {
                    Ok(value) => { value },
                    Err(_) => { -1 },
                }
            }
            '-' => {
                println!("dec {}", key);
                match redis::cmd("DECR").arg(key).query(&sock) {
                    Ok(value) => { value },
                    Err(_) => { -1 },
                }
            }
            _ => {
                match redis::cmd("GET").arg(key).query(&sock) {
                    Ok(value) => { value },
                    Err(_) => { -1 },
                }
            }
        };

        self.out.send(Message::from(value.to_string()))
    }

    fn on_close(&mut self, code: CloseCode, reason: &str) {
        match code {
            CloseCode::Normal   => println!("the client is done"),
            CloseCode::Away     => println!("the client is leaving"),
            _ => println!("client encountered an error {}", reason),
        }
    }
}

fn main() {
    let addr = "127.0.0.1:3012";

    let db = env::args().nth(1).unwrap_or(String::from("redis://127.0.0.1/"));

    println!("[*] starting ({} -> {})...", addr, db);
    listen(addr, |out| Server {
        out: out,
        sock: Client::open(db.as_str()).unwrap(),
    }).unwrap()
}
