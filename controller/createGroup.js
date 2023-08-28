const path = require('path');
const {v4: uuid } = require('uuid');


const {Group} = require('../models/database');
const sequelize = require('../models/sequelize');


let url = 'http://localhost:3000/';


exports.getCreateGropPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'createGroup.html'));
}

exports.createGroup = async(req,res,next)=>{
    let t = await sequelize.transaction();


    try{
        let {name} = req.body;
        let user = Number( req.userId.token);
        let uid = uuid();
        let link = `${url}/join/${uid}`;

        //find name of group if not exist then create
        let data = await Group.findOrCreate({
            where: {
                name: name
            },
            defaults: {
                name: name,
                link: link,
                createdBy: user
             },
             transaction: t

        })

        if(data[0].createdBy != user){
            res.send('failed');
        }
        else{
            res.send(data[0]);
            //adding relation in junction table
            await data[0].addUser(user, {
                through: { admin: true }, // Setting admin to true for the user who created the group
                transaction: t,
            });
        }
        console.trace(data);
        await t.commit();

    }catch(err){
        await t.rollback();
        res.send({error: err});
        console.trace(err);
    }
};


