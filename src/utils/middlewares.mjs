import { mockUsers } from './constants.mjs';

export const resolveIndexByUserId = (req, res, next) =>{
    const { params: {id} } = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) return res.status(400).send({ msg : "Bad Request :'( " });
    const findUserIndex = mockUsers.findIndex((user)=> user.id === parsedId);
    if(findUserIndex === -1) return res.status(404).send({ msg : "User Not Found!" })
    req.findUserIndex = findUserIndex;
    next();
}; 