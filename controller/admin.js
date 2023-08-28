const path = require('path');
const sequelize = require('../models/sequelize');


const {User,Group,GroupsUser } = require('../models/database');


exports.getAdminPage = async(req,res,next)=>{

    res.sendFile(path.join(__dirname, '../', 'public', 'adminPage.html'));

};

exports.getMembers = async(req,res,next)=>{
    try{
        let connected = Number(req.userId.connected);

        let data = await Group.findAll({
            attributes: ['id','name'],
            where: {
                id: connected
            },
            include: {model: User, attributes: ['name']}
        })

        res.send(data);

    }catch(err){
        res.send({error: err});
        console.trace(err);
    }
};


exports.addfriend = async(req,res,next)=>{
    let t = await sequelize.transaction();
    try{
        let {email} = req.body;
        let id = Number(req.userId.token);
        let connected = Number(req.userId.connected);
        
        //check if the user is admin of the group

        let check = await GroupsUser.findOne({
            where: {
                groupId: connected,
                userId: id,
                admin: true 
            }
        });

        //console.trace(check);


        if(check.admin){
            //if admin then add user to group
            let user = await User.findOne({
                attributes: ['id','name', 'email'],
                where: {
                    email: email
                },
                include: [{model: Group}]
            });
            //console.trace(user);
            if(user != null && user.email === email){

                await user.addGroup(connected, {transaction: t});

                res.send([user]);
                //console.trace(user);

            }
            else{
                res.send('user not found');
            }

        }
        else{
            res.send('not admin');
        }

        await t.commit();
    }catch(err){
        await t.rollback();
        res.send({error: err});
        console.trace(err);
    }

}; 

exports.addAdmin = async(req,res,next)=>{
    let t = await sequelize.transaction();
    try{
        let {id} = req.body;
        let user = Number(req.userId.token);
        let connected = Number(req.userId.connected);
        
        //check if the user is admin of the group

        let check = await GroupsUser.findOne({
            where: {
                groupId: connected,
                userId: user,
                admin: true 
            }
        });

        if(check.admin){
            //if admin then make his friend admin of this group
           let guser = await GroupsUser.update({
                groupId: connected,
                userId: Number(id),
                admin: true
                },{
                where: {
                    userId: id,
                    groupId: connected
                }
            });

            console.trace(guser);
            res.send('success');

        }
        else{
            res.send('not admin');
        }

        await t.commit();

    }catch(err){
        res.send({error: err});
        console.trace(err);
    }
}; 


exports.removeUser = async(req,res,next)=>{
    let t = await sequelize.transaction();
    try{
        let {id} = req.body;
        let user = Number(req.userId.token);
        let connected = Number(req.userId.connected);
        
        //check if the user is admin of the group

        let check = await GroupsUser.findOne({
            where: {
                groupId: connected,
                userId: user,
                admin: true 
            }
        });

        if(check.admin){
            //if admin then remove user from group
            let guser = await GroupsUser.destroy({
                where: {
                    groupId: connected,
                    userId: Number(id)
                }
            });

            console.trace(guser);
            res.send('success');

        }
        else{
            res.send('not admin');
        }

     await t.commit();

    }catch(err){
        res.send({error: err});
        console.trace(err);
    }

};



