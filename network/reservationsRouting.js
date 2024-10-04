//EndPoint

const express = require("express");
const ReservationsService = require("../services/reservationsService");

const router = express.Router();
const service = new ReservationsService();

router.get("/", (req, res, next) => {
     service.find(req, res, next);
})

router.get("/filter", (req, res, next) => {
    service.filter(req, res, next);
})

router.post("/", (req, res, next) => {
    service.create(req, res, next);
})

router.get("/:id", (req, res, next) => {
    service.findOne(req, res, next);
})

router.patch("/:id", (req, res, next) =>{
    service.update(req, res, next);
})

router.delete("/:id", (req, res, next) =>{
    service.delete(req, res, next);
})

module.exports = router;