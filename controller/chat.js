const path = require('path');

const sequelize = require('../models/sequelize');
const {User,Chat,Group} = require('../models/database');



exports.chatPage = (req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'public', 'chat.html'));
}

//chatting is done with socket, so i dont think we need this function
exports.postChat = async(req,res,next)=>{
    let t = await sequelize.transaction();


    try{
        let {text} = req.body;
        let id = Number(req.userId.token);
        let connected = Number(req.userId.connected);

        console.trace(id, connected, text);

        let chat = await Chat.create({
            message: text,
            userId: id,
            groupId: connected
        },{transaction: t}
        );

        res.send('success');

        await t.commit();

    }catch(err){
        await t.rollback();
        console.trace(err);
        res.send({error: err});
    }

}

exports.getGroups = async(req,res,next)=>{
    
    try{
        
        let id = Number(req.userId.token);
        //console.trace(id);

        let groups = await User.findAll({
            attributes: ['id'],
            where: {
                id: id
            },
            include: {
                model: Group
            }
            
        })

        if(groups.length > 0){
            //console.trace(groups);
            res.send(groups);    
        }
        else{
            console.trace(groups);
            res.send('no contacts');
        }
    }catch(err){
        console.trace(err);
        res.send({error: err});

    }


};


exports.getGroupChat = async (req,res,next)=>{
    
    try{
        let connected = Number(req.userId.connected);
        //console.trace(connected);

        let data = await Chat.findAll({
            attributes : ['id','message', 'userId', 'groupId', 'media'], 
            where: {
                    groupId: connected
            },
            include: [
                {model: User, attributes: ['name']},
            ]
        })

       // console.trace(data);
        res.send(data);

    }catch(err){
        res.send({error: err});
        console.trace(err);
    }
};





