const Pozos = require('./Pozos');
const Datos = require('./Pozos.data');

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
        
        new Datos({
            name: savedPozo.name,
            psi: savedPozo.psi,
            fecha: savedPozo.fecha,
            id_pozo: savedPozo._id,
        }).save();
        
        res.status(201).send(savedPozo._id);
    },
    get_data: async(req, res) => {
        const data = await Datos.find();
        res.status(200).send(data)
    }
}

module.exports = Pozo;