const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("../db.json");
const middelewares = jsonServer.defaults({
    static: "./build"
});

const port = 5000;
server.use(middelewares);
server.use(
    jsonServer.rewriter({
    "/api/*": "/$1"
})
);

server.use(router);
server.listen(port, () => {
    
})