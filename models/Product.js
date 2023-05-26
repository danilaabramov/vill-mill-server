import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        price: {
            type: Array,
            required: true,
        },
    }
)


export default mongoose.model("Product", ProductSchema)