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
    res.render("post", { data });
  } catch (error) {
    console.log(error);
  }
};

// SearchBar Post Request
// Pendinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg

const searchTerm = async (req, res) => {
  try {
    const searchTerm = req.body.searchTerm;
    // var newString = searchTerm.replace(/[^A-Z0-9]+/ig, " ").toLowerCase();
    var newString = searchTerm.replace(/[^A-Z0-9]+/ig, " "); // 'i' is for case-insensitive matching. 'g' flag ensures that all such sequences are found in the entire input string, not just the first occurrence.
    const data = await Post.find({
      $or: [
        { title: { $regex: new RegExp(newString, "i") } },
        { body: { $regex: new RegExp(newString, "i") } },
      ],
    });
    if (data.length === 0) {
      res.redirect('/');
    }
    else{
      res.render("search",{data})
    }
    // console.log(newString);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getPosts, getPostById, searchTerm };
