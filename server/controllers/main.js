const Post = require("../models/Post");

// Get All The Posts

const getPosts = async (req, res) => {
  try {
    let postPerPage = 5;
    let page = req.query.page || 1;
    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(postPerPage * page - postPerPage)
      .limit(postPerPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / postPerPage);
    res.render("home", {
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get Post By Id -- Get Specific Post

const getPostById = async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });
    res.render("post", {data});
  } catch (error) {
    console.log(error);
  }
};

// SearchBar Post Request
// Pendinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

const searchTerm = async(req,res) => {
  
}

module.exports = { getPosts, getPostById,searchTerm };
