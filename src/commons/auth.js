const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send("Unauthorize Request");
  }
  
  const token = req.headers.authorization.split((" "))[1]
  if(token === "null"){
    return res.status(401).send("Unauthorize Request");
  }

  // PAYLOAD
  jwt.verify(token, 'secretkey', (err,result) => {
    if(!err){
      req.userId = result._id;
      next();
    }
    else{
      return res.status(401).send("Unauthorize Request");
    }
  });
}

exports.verifyToken = verifyToken;

