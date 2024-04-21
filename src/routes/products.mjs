import { Router } from "express";

const router = Router(); //create router instance calling function

router.get("/api/products", (req, res)=>{
    console.log(req.headers.cookie);
    console.log(req.cookies);
    console.log(req.signedCookies);
    if(req.cookies.hello && req.cookies.hello === "world"){
        res.send([{ id: 123, name: "Rice", price: 1200}]);
    }
    return res.send({ msg : "sorry. You need correct cookies" })

})

export default router;