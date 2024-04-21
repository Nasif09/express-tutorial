import { Router } from "express";
import { query, validationResult, checkSchema, matchedData } from "express-validator";
import { mockUsers } from '../utils/constants.mjs'; // Assuming the utils folder is one level up
import { createUserValidationSchema } from '../utils/validationSchemas.mjs';
import { resolveIndexByUserId } from '../utils/middlewares.mjs';


const router = Router();

router.get(
    "/api/users",
    query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be Empty")
    .isLength({ min: 3 , max: 5})
    .withMessage("Must be 3-5 crarecters "),
    (req, res)=>{
        console.log(req.session.id);
        req.sessionStore.get(req.session.id, (err, sessionData) =>{
            if(err){
                console.log(err);
                throw err;
            }
            console.log(sessionData);
        })
        const result = validationResult(req);
        console.log(result);
    const {
        query: {filter, value}
    } = req;
    if(filter && value){
        return res.send(
            mockUsers.filter((user)=> user[filter].includes(value))
        )
    }
    return res.send(mockUsers);
});

router.post("/api/users",
checkSchema(createUserValidationSchema),
(req, res)=>{
    const result = validationResult(req);
    console.log(result);

    if(!result.isEmpty()){
        return res.status(400).send({ errors: result.array() });
    }
    const data = matchedData(req);
    const newUser = { id:mockUsers[mockUsers.length-1].id+1, ...data };
    mockUsers.push(newUser);
    return res.status(200).send(newUser);
})

router.put("/api/users/:id", resolveIndexByUserId, (req, res)=>{
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return res.send(200);
})

router.patch("/api/users/:id", resolveIndexByUserId, (req, res)=>{
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
    return res.send(200);
})

router.delete("/api/users/:id", resolveIndexByUserId, (req, res)=>{
    const { findUserIndex } = req;
    mockUsers.splice(findUserIndex, 1);
    return res.send(200);
})

router.get("/api/users/:id", resolveIndexByUserId, (req, res)=>{
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if(!findUser){
        return res.status(404).send({ msg: "Id Not found" })
    }
    return res.send(findUser);
})

export default router;
