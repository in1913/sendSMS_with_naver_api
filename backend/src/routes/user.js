import {Router} from 'express';
import USERS from '../models/USERS.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const user = Router();

function authentificateToken(req, res, next){
    let token = req.headers['authorization'];
    if(!token) return res.status(401).send('Access Denied');
    token = token.split(' ')[1];
    
    if(!token) return res.status(401).send('Access Denied');

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return res.status(403).send('Invalid Token');
        req.user = user; // 토큰에서 추출한 사용자 정보 저장
        next();
    });
}

user.get('/auth', authentificateToken, (req, res) => {
    const user = req.user;
    res.status(200).send({user});
});

user.post('/signup', async (req, res) => {
    const {name, email, password, position} = req.body;

    try {
        const value = await USERS.create({ name, email, password, position });
        res.status(200).send();
    } catch (error) {
        res.status(500).send({code: error.code, message: error.errmsg});
    }
});


user.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await USERS.findOne({email});
        if(!user){
            console.log('User not found');
            res.status(200).send({status: 'notfound', message: 'User not found'});
            return;
        }

        const compare = await bcrypt.compare(password, user.password);
        if(compare){
            console.log('Login success');
            const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET_KEY, {expiresIn: '1h'});
            res.status(200).send({status: 'success', message: 'Login success', token});
        }else{
            console.log('Login failed');
            res.status(200).send({status: 'fail', message: 'Login failed'});
        }
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
});

export default user;