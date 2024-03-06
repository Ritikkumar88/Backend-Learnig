
// wrapping the batabase connection function using promises//
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req , res, next)).catch((Err) => next(Err))
    } 
}

export {asyncHandler};



// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}   ** how of Higher order function


// wrapping the batabase connection function using async await try catch//
// const asyncHandler = (fn) => async(req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }