const express = require('express')
const router = express()

router.get('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:'Handling GET request to /orders'
        }
    )
})

router.post('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:'Handling POST request to /orders'
        }
    )
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