import { Router } from 'express';
import API_KEYS from '../models/API_KEYS.js';
import axios from 'axios';
import  naverApiHeader  from '../services/naverApiHeader.js';

const project = Router();

const domain = 'https://sens.apigw.ntruss.com';

project.post('/create', async (req, res) => {
    const { projectName, projectDesc, useSms, usePush, fk_user_id } = req.body;

    let accessKey = '';
    let secretKey = '';
    try {
        const data = await API_KEYS.findOne({ fk_user_id });
        if (!data) {
            return res.status(404).send('API keys not found');
        }
        accessKey = data.accessKey;
        secretKey = data.secretKey;
    } catch (error) {
        return res.status(500).send(`1. ${error.message}`);
    }

    try{
        const url = '/common/v2/projects';
        const method = 'POST';
        const headers = naverApiHeader(accessKey, secretKey, url, method);
        const response = await axios.post(domain + url, {
            projectName, projectDesc, useSms, usePush
        }, {headers});

        
        res.status(200).send(response.data);
    }catch(error){
        res.status(500).send(`2. ${error.message}`);
    }
});

project.post('/select', async (req, res) => {
    const { fk_user_id } = req.body;
    let accessKey = '';
    let secretKey = '';
    try {
        const data = await API_KEYS.findOne({ fk_user_id });
        if (!data) {
            return res.status(404).send('API keys not found');
        }
        accessKey = data.accessKey;
        secretKey = data.secretKey;
    } catch (error) {
        return res.status(500).send(`1. ${error.message}`);
    }

    try{
        const url = '/common/v2/projects';
        const method = 'GET';
        const headers = naverApiHeader(accessKey, secretKey, url, method);
        const response = await axios.get(domain + url,{headers});
        
        res.status(200).send(response.data);
    }catch(error){
        res.status(500).send(`2. ${error.message}`);
    }
});

export default project;