
const bcrypt = require('bcrypt');
const { Types } = require('mongoose');
const Ticket = require("../models/ticketSchema")
const saltRounds = 10;
const userFunc = {}


userFunc.test = (req, res) => {
    console.log('hey')
    res.send('im working')
}

userFunc.createTicket = async (req, res) => {
    console.log('#createTicket')
    try {
        const {owner,people,phone,card_id} =  req.body
        const howMany = await Ticket.find()
        const serial = (howMany.length + 1).toString().padStart(3,"0")

        const newTicket = await Ticket.create({
            owner,
            card_id,
            people ,
            peopleLeft:people ,
            phone,
            serial,
        })

        res.send({
            id:newTicket.id,
            serial,
        })

    } catch (error) {
        res.status(404).json({
            msg: 'Error: ' + error.message
        })
    }

}


userFunc.eatTicket = async (req,res)=>{
    console.log('#eatTicket')

    try {
        const {id,toEat} = req.body
        const _id = Types.ObjectId(id)
        let statusInfo = toEat === 0?3:1
        const updatedTicket = await Ticket.findOneAndUpdate({_id},{
            $inc:{ 
                peopleLeft: -(toEat),
                success:toEat === 0?0:1,
                info:toEat === 0?1:0,
             }
        },{new:true})

        if(updatedTicket.peopleLeft < 0){
            statusInfo = 2
            const newTicket = await Ticket.findOneAndUpdate({_id},{
                $inc:{ 
                    peopleLeft: toEat,
                    success:-1,
                    error:1,
                 }
            },{new:true})
            console.log(newTicket)
            res.status(209).json({
                msg:'Execido el limite de personas, contacte al dueño del boleto y verifique los datos',
                updatedTicket:newTicket,
                statusInfo,
            })
        }else{
            res.send({
                ok:true,
                updatedTicket,
                statusInfo,
            })
        }

        
    } catch (error) {
        console.log(error.message)
        res.status(404).json({
            msg: 'Error '+ error.message
        })
    }

}


userFunc.getInfo = async (req,res)=>{
    console.log('#getInfo')

    try {

        const allData = await Ticket.find()
        res.send(allData)
        
    } catch (error) {
        res.status(404).json({
            msg: 'Error '+ error.message
        })
    }

}

module.exports = userFunc


// userFunc.test = async (req,res)=>{
//     console.log('#aaaaaaaa')

//     try {
        
//     } catch (error) {
//         res.status(404).json({
//             msg: 'Error '+ error.message
//         })
//     }

// }