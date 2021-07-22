import { Profile } from "../models/profile.js"

export {
    index
}

function index(req, res) {
    res.render("home/index", {
        title: "Home | Shelf"
    })
}