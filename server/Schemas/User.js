const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    user_id:{
        type:String, 
        require:true
    },

    fav_genre:{
        type:String,
        require:true
    },

    playlists:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Playlist"
    }, 
    

    
})

const User = mongoose.model("User", userSchema);

module.exports = User;