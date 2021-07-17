import { Profile } from "../models/profile.js"

export {
    show,
}

function show(req, res) {
    //Find the profile in mongooseDb
    Profile.findById(req.params.id)
    .then(profile => {
        //Find the profileID of the user (passed through middleware)
        Profile.findById(req.user.profile._id)
        //?? Ask David for better explaination 
        .then(self => {
            const isSelf = self._id.equals(profile._id)
            res.render("profiles/show", {
                title: `${profile.name}'s Shelf`,
                profile,
                self,
                isSelf
            })
        })
    })
    //Error handling
    .catch((err) => {
        console.log(err)
        res.redirect("/")
    })
}