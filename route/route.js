var fs = require('fs');
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({
    extended: false
});
var express = require('express'),
    app = express();
var model = require('../model/model')
var mongoose = require('mongoose');
var whatodo = mongoose.model('whatodo');

module.exports = function (app) {

    app.post('/sucessful', urlencodedparser, function (req, res) {
        var new_task = new whatodo(req.body);
        new_task.save(function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: "Task not Saved, Try again."
                });
            }
            res.json({
                results,
                message: "sucessful."
            });
            console.log(req.body)
        });
    });

    app.get('/', function (req, res) {
        res.writeHead(200, ({
            'Content-Type': 'text/html'
        }));
        var index = fs.readFileSync(__dirname + '/index.html', 'utf8');
        res.end(index);
    });

    app.get('/api', function (req, res) {
        whatodo.find({}, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: "error ocured on getting tasks."
                });
            }
            return res.json({
                results
            });
        });
    });

    app.get('/api/:whatodoId', function (req,res) {
        whatodo.findOne({_id: req.params.whatodoId}, function (err,results) {
            if (err){
                res.json({
                    status: false,
                    error: "error occured during search"
                });
            }
            return res.json({
                results
            });
        })
    })

    app.put('/api/update/:whatodoId', function (req,res) {
        whatodo.findOneAndUpdate({_id: req.params.whatodoId}, req.body,{new: true}, function (err, results) {
            if (err){
                res.json({
                    status: false,
                    error: "error occured during update"
                });
            }
            return res.json({
                results
            });
        })
    })

    app.delete('/sucessful/:whatodoId', function (req, res) {
        whatodo.findByIdAndRemove({
            _id: req.params.whatodoId
        }, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: "delete unsucesssful."
                });
            }
            return res.json({
                results,
                message: "sucessful."
            })
        })
    })

    app.delete('/sucessful', function (req, res) {
        whatodo.find({}, function (err, results) {
            if (err) {
                err
            }
            whatodo.remove(function (err, results) {
                if (err) {
                    res.json({
                        status: false,
                        error: "delete all task unsucessful."
                    });
                }
                return res.json({
                    results,
                    status: true,
                    message: 'delete all task sucessful.'
                })
            })
        })
    })
}