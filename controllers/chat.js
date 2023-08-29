const Chat = require('../models/chats');
const S3Services = require('../services/s3Services')

exports.postChat = (req, res) => {
    const { message, name, groupId } = req.body;

        req.user.createChat({ message, name, groupId })
        .then(chat => {
            res.status(201).json({ success: true, message: 'Group message sent', chat });
        })
        .catch(err => {
            console.log(err);
            res.status(403).json({ success: false, message: 'something went wrong' });
        })
}

exports.getChats = async (req, res) => {
    try {
        const lastId = req.query.id;
        console.log('***********', lastId)
        const gId = req.query.gId;
        const chat = await Chat.findAll({ where: { groupId:gId} });
        res.status(200).json({ success: true, chat });
    } catch (err) {
        console.log(err)
    }
}

exports.uploadFile = async(req,res) => {
    try {
        const fileURL = await S3Services.uploadFile('assets/flower.jpg')
        res.status(200).json({ success: true, fileURL})
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}