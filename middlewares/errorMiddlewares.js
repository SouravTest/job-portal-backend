// middlewares/errorMiddlewares.js     || NEXT function
const errorMiddleware = (err,req,res,next) =>{
	console.log('error Middleware : ',err);
	res.status(500).send({
		success:false,
		message:"some thing went wrong !!!",
		error:err
	});
};

export default errorMiddleware;
// //error middleware || NEXT function
// const errroMiddelware = (err, req, res, next) => {
// 	console.log(err);
// 	const defaultErrors = {
// 	  statusCode: 500,
// 	  message: err,
// 	};
  
// 	// missing filed error
// 	if (err.name === "ValidationError") {
// 	  defaultErrors.statusCode = 400;
// 	  defaultErrors.message = Object.values(err.errors)
// 		.map((item) => item.message)
// 		.join(",");
// 	}
  
// 	// duplicate error
// 	if (err.code && err.code === 11000) {
// 	  defaultErrors.statusCode = 400;
// 	  defaultErrors.message = `${Object.keys(
// 		err.keyValue
// 	  )} field has to be unique`;
// 	}
// 	res.status(defaultErrors.statusCode).json({ success:false,message: defaultErrors.message });
//   };
  
//   export default errroMiddelware;