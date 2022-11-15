const {Controller} = require("./controller/controller");
const {Service} = require("./service/service");
const {Repository} = require("./repository/repository");

const app = new Controller(new Service(new Repository()))
app.mainLoop();
