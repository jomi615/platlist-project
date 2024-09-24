const mongoose = require("mongoose");

const songSchema = mongoose.Schema ({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    song_name:{
        type:String,
        require:true,
    },
    num_played:{
        type: Number,
        require: true, 
    },
    album:{
        type:String, 
        require: true
    }
})

const User = mongoose.model("Songs", songSchema);

module.exports = User;