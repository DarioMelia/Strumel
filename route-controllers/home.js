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
    const obras = await Obra.find().select({"img":0});

    res.render("obras", { obras: obras });
  } catch (err) {
    res.send(err.message);
  }
};



//Api para lazy loading de imagenes

exports.getObraImg = async (req,res) => {
  const obraID = req.params.obraID;
  const obra = await Obra.findById(obraID);
  let base64data = obra.img.data.toString("base64");
  let contentType = obra.img.contentType;
  let image = {
    data: base64data,
    contentType: contentType,
  };
  res.send(image);
}
exports.getLastImages = async (req, res) => {
  try {
    const lastObras = await Obra.find({})
      .select({ img: 1 })
      .sort({ createdAt: -1 })
      .limit(4);

    var images = [];
    lastObras.forEach((obra) => {
      let base64data = obra.img.data.toString("base64");
      let contentType = obra.img.contentType;
      let image = {
        data: base64data,
        contentType: contentType,
      };
      images.push(image);
    });

    res.send(images);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
};
