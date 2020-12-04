//zmienne, stałe

var express = require("express")
var bodyParser = require("body-parser")
var app = express()
const PORT = process.env.PORT || 3000;

var path = require("path");
const e = require("express");

var users = [
    { login: "admin", password: "admin", age: "18", student: "!", gender: "mężczyzna" }
]

var logged = false

var accountType


//parser
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/main.html"))


})

app.get("/login", function (req, res) {
    if (logged == false) {
        res.sendFile(path.join(__dirname + "/static/pages/login.html"))
    } else if (logged == true) {

        res.sendFile(path.join(__dirname + "/static/pages/logged.html"))

    }

})

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/register.html"))

})

app.get("/admin", function (req, res) {
    if (logged == true) {
        res.sendFile(path.join(__dirname + "/static/pages/adminLogged.html"))
    } else if (logged == false) {

        res.sendFile(path.join(__dirname + "/static/pages/admin.html"))
    }

})

app.get("/sort", function (req, res) {
    if(logged == true){

    let strona = "<body><a href='/sort'>SORT</a><br><a href='/gender'>GENDER</a><br><a href='/show'>SHOW</a><form onchange='this.submit()' method='GET'><input type='radio' name='sortType' value='malejąco'><label for='malejąco'>malejąco</label><input type='radio' name='sortType' value='rosnąco'><label for='rosnąco'>rosnąco</label></form><table>"

    if (req.query.sortType == "malejąco") {
        console.log("malejąco")
        users.sort(function (a, b) {
            return parseFloat(b.age) - parseFloat(a.age);
        });
        console.log(users)

        for (let i = 0; i < users.length; i++) {
            strona += "<tr style='border:1px solid navy;'>"
            for (let j = 0; j < 6; j++) {
                if (j == 0) {
                    strona += "<td style='border:1px solid navy;padding:8px'>id: " + (i + 1) + "</td>"
                } else if (j == 1) {
                    strona += "<td style='border:1px solid navy;padding:8px'>login: " + users[i].login + "</td>"

                } else if (j == 2) {
                    strona += "<td style='border:1px solid navy;padding:8px'>wiek: " + users[i].age + "</td>"
                }
            }
            strona += "</tr>"
        }

    } else if (req.query.sortType == "rosnąco") {
        console.log("rosnąco")
        users.sort(function (a, b) {
            return parseFloat(a.age) - parseFloat(b.age);
        });
        console.log(users)

        for (let i = 0; i < users.length; i++) {
            strona += "<tr style='border:1px solid navy;'>"
            for (let j = 0; j < 6; j++) {
                if (j == 0) {
                    strona += "<td style='border:1px solid navy;padding:8px'>id: " + (i + 1) + "</td>"
                } else if (j == 1) {
                    strona += "<td style='border:1px solid navy;padding:8px'>login: " + users[i].login + "</td>"

                } else if (j == 2) {
                    strona += "<td style='border:1px solid navy;padding:8px'>wiek: " + users[i].age + "</td>"
                }
            }
            strona += "</tr>"
        }
        if(logged == false){
            res.send("Nie jesteś zalogowany")
        }
    }


    strona += "</table></body>"

    res.send(strona)

    }
})

app.get("/gender", function (req, res) {
    if(logged == true){
    let strona = "<body><a href='/sort'>SORT</a><br><a href='/gender'>GENDER</a><br><a href='/show'>SHOW</a>"
    males = []
    females = []
    for (let i = 0; i < users.length; i++) {
        if (users[i].gender == "mężczyzna") {
            males.push(users[i].login)
        } else if (users[i].gender == "kobieta") {
            females.push(users[i].login)
        }
    }

    strona += "<h1>Mężczyźni:</h1><table>"
    for (let i = 0; i < males.length; i++) {
        strona += "<tr style='border:1px solid navy;'>"
        for (let j = 0; j < 3; j++) {
            if (j == 0) {
                strona += "<td style='border:1px solid navy;padding:8px'>id: " + (i + 1) + "</td>"
            } else if (j == 1) {
                strona += "<td style='border:1px solid navy;padding:8px'>login: " + males[i] + "</td>"
            } else if (j == 2) {
                strona += "<td style='border:1px solid navy;padding:8px'>płeć: mężczyzna</td>"
            }

        }
        strona += "</tr>"
    }
    strona += "</table><br><br><br>"

    strona += "<h1>Kobiety:</h1><table>"
    for (let i = 0; i < females.length; i++) {
        strona += "<tr style='border:1px solid navy;'>"
        for (let j = 0; j < 3; j++) {
            if (j == 0) {
                strona += "<td style='border:1px solid navy;padding:8px'>id: " + (i + 1) + "</td>"
            } else if (j == 1) {
                strona += "<td style='border:1px solid navy;padding:8px'>login: " + females[i] + "</td>"
            } else if (j == 2) {
                strona += "<td style='border:1px solid navy;padding:8px'>płeć: kobieta</td>"
            }

        }
        strona += "</tr>"

    }
    strona += "</table></body>"

    res.send(strona)



    }
    if(logged == false){
        res.send("Nie jesteś zalogowany")
    }

})

app.get("/show", function (req, res) {
    if(logged == true){
    let strona = "<body><a href='/sort'>SORT</a><br><a href='/gender'>GENDER</a><br><a href='/show'>SHOW</a><h1>Użytkownicy:</h1><table>"
    for (let i = 0; i < users.length; i++) {
        strona += "<tr style='border:1px solid navy;'>"
        for (let j = 0; j < 6; j++) {
            if (j == 0) {
                strona += "<td style='border:1px solid navy;padding:8px'>id: " + (i + 1) + "</td>"
            } else if (j == 1) {
                strona += "<td style='border:1px solid navy;padding:8px'>login: " + users[i].login + "</td>"
            } else if (j == 2) {
                if (users[i].password == "undefined") {
                    strona += "<td style='border:1px solid navy;padding:8px'> </td>"
                } else {
                    strona += "<td style='border:1px solid navy;padding:8px'>hasło: " + users[i].password + "</td>"
                }
            } else if (j == 3) {
                strona += "<td style='border:1px solid navy;padding:8px'>wiek: " + users[i].age + "</td>"
            } else if (j == 4) {
                if (users[i].password == "on") {
                    strona += "<td style='border:1px solid navy;padding:8px'>student</td>"
                } else {

                    strona += "<td style='border:1px solid navy;padding:8px'>admin</td>"
                }

            } else if (j == 5) {
                strona += "<td style='border:1px solid navy;padding:8px'>płeć: " + users[i].gender + "</td>"
            }
        }
        strona += "</tr>"
    }
    strona += "</table></body>"

    res.send(strona)



    }
    if(logged == false){
        res.send("Nie jesteś zalogowany")
    }
})




app.post("/handleRegister", function (req, res) {
    let data = req.body

    var canPush = true


    for (let i = 0; i < users.length; i++) {

        if (users[i].login == data.login || data.login.length < 1) {
            canPush = false
        } else {
            continue
        }

    }

    console.log(canPush)

    if (canPush) {

        users.push(data)
        console.log("User " + data.login + " added!")
        console.log(users)
        res.send("<p>Witaj," + data.login + "</p>")

    } else if (!canPush) {
        if (data.login.length < 1) {
            console.log("Login too short!")
            res.send("<p>Login zbyt krótki!</p>")
        } else {
            console.log("User " + data.login + " already exists!")
            res.send("<p>Taki użytkownik już istnieje!</p>")
        }

    }


})


app.post("/handleLogin", function (req, res) {
    let data = req.body
    var canLogIn = false

    for (let i = 0; i < users.length; i++) {

        if (users[i].login == data.login && users[i].password == data.password) {
            canLogIn = true
            if (users[i].student == "on") {
                accountType = "student"
            } else {
                accountType = "admin"
            }
        } else {
            continue
        }

    }

    console.log(canLogIn)

    if (canLogIn) {
        logged = true
        console.log("Logged as: " + data.login)
        console.log("Account type: " + accountType)
        console.log(users)

        res.send("<p>Zalogowano na użytkownika: " + data.login + "</p>")


    } else if (!canLogIn) {

        console.log("Wrong login or password!")

        res.send("<p>Zły login lub hasło!</p>")
    }


})

app.post("/handleLogOut", function (req, res) {
    logged = false
    accountType = undefined
    res.redirect("/")
})




app.use(express.static('static'))


//nasłuch na określonym porcie
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})

