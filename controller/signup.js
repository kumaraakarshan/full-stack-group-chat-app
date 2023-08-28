const path = require('path');
const bcrypt = require('bcrypt');
const {Op} = require('sequelize');

const {User} = require('../models/database');
const sequelize = require('../models/sequelize');


exports.signupPage = (req,res,next)=>{
    res.status(200).sendFile(path.join(__dirname, '../', 'public', 'signup.html'));
} 

exports.postSignup = async (req,res,next)=>{
    const t = await sequelize.transaction();
    const {name,email,number,password} = req.body;


    if(name.length>0 && email.length>0 && number.length>0 && password.length>0){

        try{

            let data = await User.findOne({
                where:{
                    [Op.or]: [
                        {email: email},
                        {phoneNumber: number}
                    ]
                }
            })

            if(data){
                res.send('user already exists');
            }else{
                console.log('It is a new user');

                try{

                
                    let hash = await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUND));

                    console.trace(hash);

                    let data = await User.create({
                        name: name,
                        email: email,
                        phoneNumber: number,
                        password: hash,
                    },{
                        transaction: t
                    })

                    res.send('success');
                    //res.redirect('/login');
                    await t.commit();

                    
                }catch(err){
                    t.rollback();
                    console.trace(err);
                    res.send('failed');

                }
            }

       
       
        }catch(err){
            res.send({error: err});
            console.trace(err);
        }

    }else{
        res.send('fill all field');
    }
}