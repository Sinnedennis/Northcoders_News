const mongoose = require('mongoose');
const { Articles, Comments, Modles, Topics, Users } = require('../models/models');


function getAllTopics(req, res, next) {
    Topics.find()
        .then(topics => res.send(topics))
        .catch(err => next(err));
}

function getArticlesByTopic(req, res, next) {
    const topicID = req.params.topic_id;
    Topics.findById(topicID)
        .then(topic => {
            return Articles.find({ belongs_to: topic.slug })
        })
        .then(articles => { res.send(articles) })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 })
            next(err)
        })
}

function getAllArticles(req, res, next) {
    Articles.find()
        .then(articles => res.send({ articles }))
        .catch(err => next(err));
}

function getCommentsByArticle(req, res, next) {
    const articleID = req.params.article_id;
    Comments.find({ belongs_to: articleID })
        .then(comments => res.send({ comments }))
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 })
            next(err)
        })
}

function postCommentByArticle(req, res, next) {
    const articleID = req.params.article_id;
    const commentText = req.body.comment;

    const comment = new Comments(
        {
            body: req.body.comment,
            belongs_to: req.params.article_id
        })
        .save()
        .then(() => {
            return Comments.find({ body: req.body.comment, belongs_to: req.params.article_id })
        })
        .then((insertedComment) => {
            res.send({
                message: "Comment successfully inserted!",
                comment: insertedComment[0],
            })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 })
            next(err)
        })
}

function putVoteOnArticle(req, res, next) {
    let vote;
    if (req.query.vote.toLowerCase() === "up") vote = 1;
    else if (req.query.vote.toLowerCase() === "down") vote = -1;
    else vote = 0;

    Articles.findByIdAndUpdate(req.params.article_id, { $inc: { votes: vote } }, { new: true })
        .then((article) => {
            res.send({ message: "Article upvoted!", article })
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 })
            next(err)
        })
}

function deleteCommentById(req, res, next) {
    Comments.findByIdAndRemove(req.params.comment_id)
        .then(deletedComment => {
            res.send({ message: "Comment successfully deleted", deletedComment })
        })
}

function getUserByUseName(req, res, next) {
    Users.find({ username: req.params.username })
        .then(user => {
            res.send(user[0]);
        })
        .catch(err => {
            if (err.name === 'CastError') return next({ err, type: 404 })
            next(err)
        })
}

module.exports = { getAllTopics, getArticlesByTopic, getAllArticles, getCommentsByArticle, postCommentByArticle, putVoteOnArticle, deleteCommentById, getUserByUseName };