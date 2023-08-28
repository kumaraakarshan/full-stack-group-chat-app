require('dotenv').config();
const jwt = require('jsonwebtoken');

const {GroupsUser,Chat} = require('../models/database');
const sequelize = require('../models/sequelize');

try{

const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:4000/']
    }
});


let auth = async(cred)=>{
    try{
        cred = JSON.parse(cred);
        let id = jwt.verify(cred.token, process.env.JSON_SECRET_KEY);
        id = Number(id);

        let data = await GroupsUser.findOne({
            where: {
                userId: id,
                groupId: cred.connected
            }
        })

        if(data.userId === id && data.groupId === cred.connected){
        return data
        }
        return false
    }catch(err){
        console.trace(err);
    }
}


function initializeSocketIO(io) {
io.on('connection', socket =>{
    
    socket.on('join-group',async group =>{
        let pass = await auth(group);
console.log(pass);
        if(pass){
            socket.join(pass.groupId);

        }
        else{
            socket.emit('join-group-failed', 'You have no permission');
        }
    })

    //listening events from client
    socket.on('send-msg', async (msg, room)=>{
        
        let pass = await auth(room);
        console.log(pass);
        
        if(pass){
            socket.to(pass.groupId).emit('receive-msg',{msg: msg, g: pass.groupId});

            let t = await sequelize.transaction();

            try{

                let chat = await Chats.create({
                    message: msg,
                    userId: pass.userId,
                    groupId: pass.groupId,
                    media: false
                },{transaction: t}
                );

                await t.commit();
                console.log('Message saved to database:', chat);

            }catch(err){
                await t.rollback()
                console.trace(err);
            }
            

        }
        else{
            //sending event to frontend
            socket.emit('send-message-failed', 'You have no permission');
        }
    })


    socket.on('media-sent', async (room)=>{
        
        let pass = await auth(room);
        
        if(pass){
            socket.to(pass.groupId).emit('reload','test');
            console.trace('reload received')
            
        }
        else{
            //sending event to frontend
            socket.emit('send-message-failed', 'You have no permission');
        }
    })

})


}
}catch(err){
    console.trace(err);
}

module.exports = initializeSocketIO;