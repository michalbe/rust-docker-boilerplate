#![feature(plugin, custom_derive)]
#![plugin(rocket_codegen)]

extern crate rocket;
extern crate mysql;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;
extern crate serde;
extern crate serde_json;

use rocket_contrib::{Template};

mod classes;

fn rocket() -> rocket::Rocket {
    rocket::ignite()
        .attach(Template::fairing())
        .mount("/", routes![
            classes::login::logged_in,
            classes::login::not_logged_in,
            classes::login::login,
            classes::login::logout
        ])
}

fn main() {
    rocket().launch();
}
