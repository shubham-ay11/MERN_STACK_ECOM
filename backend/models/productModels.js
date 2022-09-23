const mongoose= require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
    name:{
        type: String,
        requrired:[true,"Please Enter product name"]
    },
    description:{
        type: String,
        requrired:[true,"Please Enter product description"]

    },

    price:{
        type: Number,
        required:[true,"Please Enter Price"],
        maxLength:[8,"Price should be less than 8 digits"]
    },
    ratings:{
        type: Number,
        default: 0

    },
    numberOfReview:{
        type: Number,
        default: 0
       

    },
    images:[{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    }
    ],
    category:{
        type: String,
        required: [true, "Please Enter Product Category"],
        
    },
    stock:{
        type:Number,
        requrired:[true, "Please Enter PRoduct Stock"],
        maxLength:[4,"Stock cannot exceed 4 character"],
        default:1
    },
    
    reviews:[
        
        {
            user:{
                type: mongoose.Schema.ObjectId,
                require:true
            },
            name:{
                type: String,
                required: true

            },
            rating:{
                type:Number,
                required: true,
            },
            comment:{
                type: String,
                required: true

            }

        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }


})

module.exports= mongoose.model("Products",productSchema)