var mongoose = require('mongoose');
var whatodo = mongoose.model('whatodo');


class controller {
    getTasks(req, res) {
        var new_task = new whatodo(req.body);
        new_task.save(function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: "Task not Saved, Try again."
                });
            }
            res.json(
                req.body
            );
        });
    }

    displayTasks(req, res) {
        res.writeHead(200,({'Content-Type':'text/html'}));
        var index = fs.readFileSync(__dirname + '/index.html', 'utf8');
        res.end(index);
    }
}