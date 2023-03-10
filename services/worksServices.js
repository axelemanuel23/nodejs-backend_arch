const boom = require("@hapi/boom");
const { works } = require("./models");

class WorksServices {
    create(req, res, next){
        try{
            const newWork = new works(req.body);
            newWork.save();
            res.status(201).json({
                message: "Created",
                data: newWork,
            })
        }catch(err){
            next(err)
        }
    }
    async find(req, res, next){
        try{
            const works = await works.find();
            res.status(200).json({
                mesage: "Succeed",
                data: works,
            })
        }catch(err){
            next(err)
        }
    }
    async findOne(req, res, next){
        try{
            const work = await works.findById(req.params.id);
            if(work==null){
                throw boom.notFound("Not found");
            }else{
                res.status(200).json({
                    message: "Succeed",
                    data: work,
                })
            }
        }catch(err){
            next(err)
        }
    }

     //Update One
     async update(req, res, next){
        try{
            const work = await works.findByIdAndUpdate(req.params.id, req.body);
            if(work == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: work,
                });     
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Delete One

    async delete(req, res, next){
        try{
            const work = await works.findOneAndDelete({_id: req.params.id});
            if(work == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Deleted",
                    data: work
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Filter

    async filter(req, res, next){
        try{
            const list = await works.find(req.query);
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

module.exports = { WorksServices };