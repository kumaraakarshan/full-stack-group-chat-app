const path = require('path');

const {Group} = require('../models/database');
const sequelize = require('../models/sequelize');

exports.getJoinGropPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'joinGroup.html'));
}

exports.getGroupName = async(req,res,next)=>{

    try{
        let {link} = req.body;
        let name = await Group.findOne({
            attributes: ['name', 'link'],
            where: {
                link: link 
            }
        })

        res.send(name);

        //console.trace(link, name);

    }catch(err){
        res.send({error: err});
        console.trace(err);
    }
}


exports.joinGroup = async(req,res,next)=>{
    let t = await sequelize.transaction();

    try{
        let user = Number(req.userId.token);
        let connected = req.userId.connected;
        console.trace(user, connected);

        let data = await Group.findOne({
            where: {
                name: connected
            }
        })

        await data.addUser(user, {transaction: t});

        res.send(data);
        await t.commit();
    }catch(err){
        await t.rollback();
        res.send({error: err});
        console.trace(err);
    }
}