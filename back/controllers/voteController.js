const Vote = require('../models/vote');

const ObjectId = require('mongoose').Types.ObjectId;

class VoteController {
    static async createVote(req, res) {
        const { option } = req.body;
        const user = req.user;
        const postId = req.params.postId;

        console.log(req.body);

        if (!option) {
            res.status(400).json({message: "Option is not provided"});
            return;
        }
        try {
            const vote = await Vote.findOne({
                user: user._id,
                post: postId
            })

            if (vote) {
                res.status(400).json({message: "You've already voted in this poll"});
                return;
            }

            const newVote = new Vote({
                user: user._id,
                post: postId,
                option: option
            });

            await newVote.save();

            res.status(200).json({message: 'Success'});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }

    static async getVote(req, res) {
        const user = req.user;
        const postId = req.params.postId;

        try {
            const vote = await Vote.findOne({
                user: user._id,
                post: postId
            })
            res.status(200).json({vote: vote});
        }
        catch(e) {
            console.log(e);
            res.status(500).json({message: 'Server error'});
        }
    }
}

module.exports = VoteController;