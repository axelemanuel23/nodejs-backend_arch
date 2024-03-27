const boom = require("@hapi/boom");
const { todos } = require("./models");
class TodosService {
    //Create One
    async create(req, res, next){
        try{
            const data = await todos.find({name: req.body.text});
            const newTodo = new todos(req.body);
            const match = data.filter((item) => item.text.toLowerCase() == newTodo.text.toLowerCase());
            if(match!=""){
                throw boom.conflict("Already Exist", match);
            }else{
                newTodo.save();
                res.status(201)
                    .json({
                        message: "Created",
                        data: newTodo,
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
            const list = await todos.find();
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
            const todo = await todos.findById(req.params._id);
            if(todo == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: todo,
                });
        }catch(err){
            err.serviceError = true;
            next(err);
        }
    }


    //Update One
    async update(req, res, next){
        try{
            const todo = await todos.findByIdAndUpdate(req.params._id, req.body);
            if(todo == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: todo,
                });     
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Delete One

    async delete(req, res, next){
        try{
            const todo = await todos.findOneAndDelete({_id: req.params._id});
            if(todo == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Deleted",
                    data: todo
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Filter

    async filter(req, res, next){
        try{
            const list = await todos.find(req.query);
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

module.exports = TodosService;