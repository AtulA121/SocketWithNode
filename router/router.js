let express=require("express");
let router=express.Router();
let auth=require("../authentication/auth");
let controller=require("../controllers/controller");

router.get("/getEventData",controller.getAllData);
router.get("/getSpecialEventData",auth.verifyToken,controller.getData);
router.post("/registerUser",controller.registerUser);
router.post("/loginUser",controller.loginUser);
router.post("/deleteData",auth.verifyToken,controller.deleteData);
router.post("/saveUserData",auth.verifyToken,controller.saveUserData);
router.post("/createEvent",auth.verifyToken,controller.createEvent);
router.post("/logoutUser",auth.verifyToken,controller.logoutUser);

module.exports=router;