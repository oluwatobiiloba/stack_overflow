const commentServices = require('../services/commentServices')

exports.createComment = async (req,res,next)=>{
    try{
        const data = await commentServices.creatComment(req)
        
    return res.status(201).json({
        status: 'success',
        message: "Comment Posted 🙂",
        data: {
            data, 
        }
        })
    }
    catch(err) {
        console.log(err.message)
        return res.status(500).json(err)
    }
}

exports.getAllComments = async (req,res,next) => {
    try{
     const data = await commentServices.getAllComments();
     if(!data){
        return res.status(404).json({
            status: 'failed',
            message: "That's odd, no comments found",
            })
    }
         return res.status(201).json({
             status: "success",
             message: `${data.length} comments found`,
             data:{
                 data
             }
         })
    }catch(err){
     console.log(err.message)
     return res.status(500).json(err)
    }
 }

 exports.getCommentsByUserId = async (req,res,next) => {
    try{
     const data = await commentServices.getCommentsByUserId(req.params.id);
     if(!data){
        return res.status(404).json({
            status: 'failed',
            message: "Sorry, no comments by this user",
            })}
    return res.status(201).json({
             status: "success",
             message: `${data.length} comments found`,
             data:{
                 data
             }
         })
    }catch(err){
     console.log(err.message)
     return res.status(404).json({
        status: 'Not found',
        message: err.message,
        data:{
            err
        }
        })
    }
 }

 exports.getCommentsByAnswerId = async (req,res,next) => {
    try{
     const data = await commentServices.getCommentsByAnswerId(req.params.id);
         return res.status(201).json({
             status: "success",
             message: `${data.length} comments found`,
             data:{
                 data
             }
         })
    }catch(err){
     console.log(err.message)
     return res.status(404).json({
        status: 'Not found',
        message: err.message,
        data:{
            err
        }
        })
    }
 }