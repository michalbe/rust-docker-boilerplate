use rocket::outcome::IntoOutcome;
use rocket::request::{self, Form, FromRequest, Request};
use rocket::http::{Cookie, Cookies};
use rocket_contrib::{Json};

#[derive(FromForm)]
struct Login {
    username: String,
    password: String
}

use mysql as my;

#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
struct Users {
    id: i32,
    username: String,
    #[serde(skip_deserializing,skip_serializing)]
    password: String,
    email: String
}

impl<'a, 'r> FromRequest<'a, 'r> for Users {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<Users, ()> {
        request.cookies()
            .get_private("userData")
            .map(|id| serde_json::from_str(&id.value()).unwrap())
            .or_forward(())
    }
}

#[post("/login", data = "<login>")]
fn login(mut cookies: Cookies, login: Form<Login>) -> Json {
    let mut builder = mysql::OptsBuilder::new();
    builder.ip_or_hostname(Some("ov-db"))
        .db_name(Some("outvoice"))
        .user(Some("root"))
        .pass(Some("examplePass"))
        .prefer_socket(false);

    let pool = my::Pool::new(builder).unwrap();
    let selected_users: Vec<Users> = pool
        .prep_exec(
            r"SELECT id, username, email, password FROM users WHERE username=? OR email=?",
            (&login.get().username, &login.get().username)
        ).map(|result| {
            result.map(|x| x.unwrap()).map(|row| {
                let (id, username, email, password) = my::from_row(row);
                Users {
                    id: id,
                    username: String::from_utf8(username).unwrap(),
                    password: String::from_utf8(password).unwrap(),
                    email: String::from_utf8(email).unwrap()
                }
            }).collect()
        }).unwrap();

    if selected_users.len() == 1 && login.get().password == selected_users[0].password {
        cookies.add_private(
            Cookie::new("userData", serde_json::to_string(&selected_users[0]).unwrap())
        );

        Json(json!({
            "status": 200,
            "msg": "Successfully loged in"
        }))

    } else {
        Json(json!({
            "status": 500,
            "msg": "Wrong login or password"
        }))
    }
}

#[post("/logout")]
fn logout(mut cookies: Cookies) -> Json {
    cookies.remove_private(Cookie::named("userData"));
    Json(json!({
            "status": 200,
            "msg": "Successfully logged out."
        }))
}

#[get("/status")]
fn logged_in(user: Users) -> Json {
    Json(json!({
        "status": 200,
        "msg": "You are logged",
        "userData": user
    }))

}

#[get("/status", rank = 2)]
fn not_logged_in() -> Json {
    Json(json!({
        "status": 500,
        "msg": "You are not logged in."
    }))
}

