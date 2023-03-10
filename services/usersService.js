const boom = require("@hapi/boom");
const { users } = require("./models");
class UsersService {
    //Create One
    async create(req, res, next){
        try{
            const data = await users.find({name: req.body.name});
            const newUser = new users(req.body);
            const match = data.filter((item) => item.name.toLowerCase() == newUser.name.toLowerCase());
            if(match!=""){
                throw boom.conflict("Already Exist", match);
            }else{
                newUser.save();
                res.status(201)
                    .json({
                        message: "Created",
                        data: newUser,
                    });
            }
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    //Get All
    async find(req, res, next){
        try{
            const list = await users.find();
            res.status(200)
                .json({
                    message: "Succeed",
                    data: list,
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }

    //Get One by Id
    async findOne(req, res, next){
        try{
            const user = await users.findById(req.params.id);
            if(user == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: user,
                });
        }catch(err){
            err.serviceError = true;
            next(err);
        }
    }


    //Update One
    async update(req, res, next){
        try{
            const user = await users.findByIdAndUpdate(req.params.id, req.body);
            if(user == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: user,
                });     
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Delete One

    async delete(req, res, next){
        try{
            const user = await users.findOneAndDelete({_id: req.params.id});
            if(user == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Deleted",
                    data: user
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Filter

    async filter(req, res, next){
        try{
            const list = await users.find(req.query);
            if(list == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: list,
                })
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
}

module.exports = UsersService;