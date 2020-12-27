const express = require('express')
const router = express()
const mongoose = require('mongoose')
const Order = require('../models/order')

router.get('/',(req,res,next)=>{
    Order.find().then(data=>{

        res.status(200).json(
            {
                message:'Handling GET request to /orders',
                orders:data,
                count:data.length
            }
        )
    }).catch(
        err=>{
            res.status(404).json({
                message:'err'
            })
        }
    )
})

router.post('/',(req,res,next)=>{
    const order = new Order({
        _id : new mongoose.Types.ObjectId(),
        product:req.body.product,
        quantity:req.body.quantity

    })
    order.save().then(data=>{
        res.status(200).json(
            {
                message:'Handling POST request to /orders',
                order:data
            }
        )
    }).catch(err=>{
        res.status(404).json({
            message:'error'
        })
    })
    
})

router.post('/:orderId',(req,res,next)=>{
    const id = req.params.orderId
    if(id == 'dattring'){
        res.status(200).json({
            message:"this is your Order"
        })
    }else{
        res.status(200).json({
            message:"you passed an id"
        })
    }

})

router.patch('/:orderId',(req,res,next)=>{
    const id = req.params.orderId
        res.status(200).json({
            message:"Update Order"
        })

})

router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId
        res.status(200).json({
            message:"Delete Order"
        })

})
module.exports = router