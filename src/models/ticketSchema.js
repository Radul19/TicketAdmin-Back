const { Schema, model } = require('mongoose')

const TicketSchema = new Schema(
    {
        owner: { type: String, required: true },
        card_id: { type: String, required: true },
        people: { type:Number, required: true },
        peopleLeft: { type:Number, required: true },
        phone: { type:String, required: true },
        serial: { type:String, required: true },
        success: { type:Number, required: true,default:0 },
        error: { type:Number, required: true,default:0 },
        info: { type:Number, required: true,default:0 },
        // serial: { type:String, required: true },
    },
    {
        timestamps: true,
    }
);

TicketSchema.methods.changeName = function () {
    // console.log(`Testing name here ${this.name}`)
    return this.name = 'Testing here'
}
TicketSchema.methods.presignedProfile = async function () {
    return this
}


module.exports = model('User', TicketSchema)
