const Pozos = require('./Pozos');

const Pozo = {
    get: async(req, res) => {
        const { id } = req.params;
        const pozo = await Pozos.findOne({ _id: id});
        res.status(200).send(pozo);
    },
    list: async(req, res) => {
        const pozo = await Pozos.find();
        res.status(200).send(pozo);
    },
    create: async(req, res) => {
        const pozo = new Pozos(req.body);
        const savedPozo = await pozo.save();
        res.status(201).send(savedPozo._id);
    }
}

module.exports = Pozo;