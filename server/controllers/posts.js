import mongoose from 'mongoose';
import PostList from '../models/postList.js';

export const getPosts = async (req, res) => {
    try {
        const postLists = await PostList.find();

        res.status(200).json(postLists);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPostList = new PostList({...post,creator:req.userId,createdAt:new Date().toISOString()});

    try {
        await newPostList.save();

        res.status(201).json(newPostList);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id:_id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostList.findByIdAndUpdate(_id,{...post,_id},{new:true} )
    
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const {id:_id} = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    await PostList.findByIdAndRemove(_id);

    res.json({message:'Post deleted successfully'});
}

export const likePost = async (req,res) => {
    const {id:_id} = req.params;

    if(!req.userId) return res.json({message:'Unauthenticated'});


    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const post = await PostList.findById(_id);

    const index = post.likes.findIndex((id)=>id===String(req.userId));

    if(index===-1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id)=>id!==String(req.userId))
    }

    const updatedPost = await PostList.findByIdAndUpdate(_id,post,{new:true});

    res.json(updatedPost);
}