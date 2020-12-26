const express = require('express')
const router = express()

router.get('/',(req,res,next)=>{
    res.status(200).json(
        {
            message:'Handling GET request to /products'
        }
    )
})

router.post('/',(req,res,next)=>{
    const product = {
        name: req.body.name,
        price: req.body.price
    }
    res.status(200).json(
        {
            message:'Handling POST request to /products',
            product:product
        }
    )
})

router.post('/:productId',(req,res,next)=>{
    const id = req.params.productId
    if(id == 'dattring'){
        res.status(200).json({
            message:"this is your product"
        })
    }else{
        res.status(200).json({
            message:"you passed an id"
        })
    }

})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId
        res.status(200).json({
            message:"Update Product"
        })

})

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId
        res.status(200).json({
            message:"Delete Product"
        })

})
module.exports = router