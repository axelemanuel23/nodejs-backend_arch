const boom = require("@hapi/boom");
const { reservations } = require("./models");
class ReservationsService {
    //Create One
    async create(req, res, next){
        try{
            const data = await reservations.find({name: req.body.text});
            const newReservation = new reservations(req.body);
            const match = data.filter((item) => item.text.toLowerCase() == newReservation.text.toLowerCase());
            if(match!=""){
                throw boom.conflict("Already Exist", match);
            }else{
                newReservation.save();
                res.status(201)
                    .json({
                        message: "Created",
                        data: newReservation,
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
            const list = await reservations.find();
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
            const reservation = await reservations.findById(req.params.id);
            if(reservation == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: reservation,
                });
        }catch(err){
            err.serviceError = true;
            next(err);
        }
    }


    //Update One
    async update(req, res, next){
        try{
            const reservation = await reservations.findByIdAndUpdate(req.params.id, req.body);
            if(reservation == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Succeed",
                    data: reservation,
                });     
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Delete One

    async delete(req, res, next){
        try{
            const reservation = await reservations.findOneAndDelete({_id: req.params.id});
            if(reservation == null){
                throw boom.notFound("Not found");
            }
            res.status(200)
                .json({
                    message: "Deleted",
                    data: reservation
                });
        }catch(err){
            err.serviceError = true;
            next(err)
        }
    }
    
    //Filter

    async filter(req, res, next){
        try{
            const list = await reservations.find(req.query);
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

module.exports = ReservationsService;