import { Router } from 'express';
import API_KEYS from '../models/API_KEYS.js';

const api = Router();

api.post('/create', async (req, res) => {
    const { accessKey, secretKey, fk_user_id } = req.body;

    try{
        const data = await API_KEYS.create({ accessKey, secretKey, fk_user_id });
        res.status(200).send({ accessKey : data.accessKey,
                    createdon : data.createdon
            });
    }catch(error){
        res.status(500).send({error});
    }
});

api.post('/select', async (req, res) => {
    const { fk_user_id } = req.body;

    try{
        const data = await API_KEYS.find({ fk_user_id }, 'accessKey createdon').sort({createdon: -1});
        res.status(200).send(data);
    }catch(error){
        res.status(200).send({status: 'fail', error});
    }
});

api.post('/delete', async (req, res) => {
    const { ids, fk_user_id } = req.body;

    try{
        const result = await API_KEYS.deleteMany({ _id: { $in: ids } });
        const data = await API_KEYS.find({ fk_user_id }, 'accessKey createdon').sort({createdon: -1});

        res.status(200).send(data);
    }catch(error){
        res.status(500).send(error);
    }
});

export default api;