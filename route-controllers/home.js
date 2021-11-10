const Obra = require("../models/obra.js");

exports.homeGet = async (req, res) => {
  try {
    const lastObras = await Obra.find({}).select({"img":0}).sort({ createdAt: -1 }).limit(4);

    res.render("home", { obras: lastObras });
  } catch (err) {
    res.send(err.message);
  }
};

exports.obrasGet = async (req, res) => {
  try {
    const obras = await Obra.find();

    res.render("obras", { obras: obras });
  } catch (err) {
    res.send(err.message);
  }
};



//Api para lazy loading de imagenes

exports.getLastImages = async (req, res) => {
  try {
    const lastObras = await Obra.find({})
      .select({ img: 1 })
      .sort({ createdAt: -1 })
      .limit(4);
    res.send(lastObras);
  } catch (err) {
    res.send(err.message);
  }
};
