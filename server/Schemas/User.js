const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    user_id:{
        type:String, 
        require:true
    },

    access_token:{
        type:String, 
        require:true
    },

    songs_played:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Songs
    }],
})

const User = mongoose.model("User", userSchema);

module.exports = User;