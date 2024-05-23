const mongoose = require("mongoose");

const userSchema = mongoose.Schema ({
    user_id:{
        type:String, 
        require:true
    },
    access_token:{
        type:String, 
        require: true,
        unique: true
    }, 

    expires_in:{
        type:String
    },

    token_type:{
        type:String
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;