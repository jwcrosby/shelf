import { Profile } from "../models/profile.js"
import { Collection } from "../models/collection.js"

export {
    show,
}

function show(req, res) {
    //Find the profileID of the user (passed through middleware)
    Profile.findById(req.user.profile._id)
        .then(profile => {
            //Find the collections associated with that profile
            Collection.find({ owner: profile._id })
            .populate("records")
            .populate("owner")
            .then(collections => {
                //Then render
                res.render("profiles/show", {
                    title: `My Profile | Shelf`,
                    profile,
                    collections
                })
            })
        })
    
    //Error handling
    .catch((err) => {
        console.log(err)
        res.redirect("/")
    })
}