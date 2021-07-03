const { posts } = require("../../mongodb/models");
const { isAuthorized } = require("../tokenHandle");

module.exports = async (req, res) => {
  try{
    const { post_id } = req.params;
    const tokenBodyData = isAuthorized(req);
    if(!tokenBodyData){
      return res.status(401).send({
        data: null,
        message: "Authorization dont exist"
      });
    }

    await posts.findByIdAndDelete(post_id)
    .then((result) => {
      res.status(200).send({
        data: {
          id: result._id
        },
        message: "Successfully post delete"
      });
    });
  }catch(err){
    res.status(500).send({
      data: null,
      message: "Server Error"
    });
  }
};