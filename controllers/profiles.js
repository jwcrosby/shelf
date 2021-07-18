import { Profile } from "../models/profile.js"

export {
    show,
}

function show(req, res) {
    //Find the profileID of the user (passed through middleware)
    Profile.findById(req.user.profile._id)
        //?? Ask David for better explaination 
        .then(profile => {
            res.render("profiles/show", {
                title: `${profile.name}'s Shelf`,
                profile,
            })
        })
    //Error handling
    .catch((err) => {
        console.log(err)
        res.redirect("/")
    })
}