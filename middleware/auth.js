require('dotenv').config();
const jwt = require('jsonwebtoken');

exports.auth = async(req,res,next)=>{
    
    try{
        let token = req.header('Authorization');
        token = JSON.parse(token);
        //console.trace(token.token, token.messageId);
        let id = jwt.verify(token.token,process.env.JSON_SECRET_KEY);
        //console.trace(id);
        if(id){          
            token.token = id;  
            req.userId = token;
            //console.trace(req.userId);
            next()
        }else{
            console.trace('something went wrong in id')
        }
      
    }catch(err){
        res.redirect('/login');
        console.trace(err);
    }
}
