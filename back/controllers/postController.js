const Post = require('../models/post');
const user = require('../models/user');
const Vote = require('../models/vote');

const ObjectId = require('mongoose').Types.ObjectId;

class PostController {
    static async createGroupPost(req, res) {
        const groupId = req.params.groupId;
        const user = req.user;
        const groupUser = req.groupUser;
        const content = req.body;

        if (!content || !content.title || !content.content) {
            res.status(400).json('Post content is not complete');
            return;
        }

        if (content.is_poll && (!content.options || content.options.length < 2)) {
            res.status(400).json('Poll is not complete');
            return;
        }
        else if (content.is_poll) {
            for (let option of content.options) {
                if (!option.name) {
                    res.status(400).json('Poll is not complete');
                    return;
                }
            }
        }
        
        try {
            const newPost = new Post({
                created_date: new Date(),
                confirmed: groupUser.is_admin,
                group: groupId,
                creator: user._id,
                title: content.title,
                content: content.content,
                is_poll: content.is_poll,
                options: content.is_poll ? content.options : null
            });

            await newPost.save();

            res.status(200).json({message: 'Success'});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async updateGroupPostById(req, res) {
        const groupId = req.params.groupId;
        const postId = req.params.postId;
        const user = req.user;
        const groupUser = req.groupUser;
        const content = req.body;

        if (!ObjectId.isValid(postId)) {
            res.status(400).json('Invalid ID');
            return;
        }

        if (!content || !content.title || !content.content) {
            res.status(400).json('Post content is not complete');
            return;
        }

        if (content.is_poll && (!content.options || content.options.length < 2)) {
            res.status(400).json('Poll is not complete');
            return;
        }
        else if (content.is_poll) {
            for (let option of content.options) {
                if (!option.name) {
                    res.status(400).json('Poll is not complete');
                    return;
                }
            }
        }

        try {
            const updatedPost = {
                confirmed: groupUser.is_admin,
                title: content.title,
                content: content.content,
                is_poll: content.is_poll,
                options: content.is_poll ? content.options : null
            };

            const result = await Post.findOneAndUpdate({
                _id: postId, 
                group: groupId, 
                creator: user._id
            }, updatedPost).exec();

            if (result) {
                res.status(200).json({message: 'Success'});
            }
            else {
                res.status(400).json({message: 'Post not found or it was not created by current user'});
            }
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async getGroupPosts(req, res) {
        const groupId = req.params.groupId;
        const unapproved = req.query.unapproved;
        const groupUser = req.groupUser;

        const confirmed = !(unapproved == 'true' && groupUser.is_admin);

        try {
            const posts = await Post.find({
                group: groupId,
                confirmed: confirmed
            })
                .populate('creator')
                .populate('group')
                .exec();
            res.status(200).json({'posts': posts});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async getGroupPostById(req, res) {
        const groupId = req.params.groupId;
        const postId = req.params.postId;

        try {
            const [post, votes] = await Promise.all([
                Post.findOne({
                    group: groupId, 
                    _id: postId
                })
                    .populate('creator')
                    .populate('group')
                    .exec(),
                Vote.find({post: postId}).exec()
            ]);
            if (!post.confirmed && !user.is_admin) {
                res.status(403).json({message: "You can't view this post"});
                return;
            }
            if (post.is_poll) {
                for (let option of post.options) {
                    option.votes = votes.filter(vote => vote.option == option.name).length;
                }
            }
            res.status(200).json({post: post});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async confirmPostById(req, res) {
        const groupId = req.params.groupId;
        const postId = req.params.postId;

        try {
            const post = await Post.findOneAndUpdate({
                group: groupId,
                _id: postId
            }, {
                confirmed: true
            }).exec();
            res.status(200).json({message: 'Success'});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }

    }
    static async deletePost(req, res) {
        const groupId = req.params.groupId;
        const postId = req.params.postId;
        const groupUser = req.groupUser;
        const user = req.user;

        try {
            const post = Post.findOne({_id: postId, creator: user._id, group: groupId});

            if (!post && !groupUser.is_admin) {
                res.status(401).json({message: "You are not authorized to delete this post"});      
                return;          
            }

            const deletedPost = await Post.findOneAndDelete({
                group: groupId,
                _id: postId
            }).exec();
            if (deletedPost) {
                res.status(200).json({message: 'Success'});
            }
            else {
                res.status(400).json({message: 'Post not found in specified group'});
            }
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }
}

module.exports = PostController;