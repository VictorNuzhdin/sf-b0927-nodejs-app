const http = require("http");
const fs = require("fs");

//const { JSDOM } = require("jsdom");
//const { window } = new JSDOM("");
//const $ = require("jquery")(window);

//https://github.com/jsdom/jsdom
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const hostname = '0.0.0.0';
const port = 8000;

const server = http.createServer((request, response) => {
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');

    fs.readFile('./index.html', null, function (error, html_code) {
        if (error) {
            response.writeHead(404);
            response.write('Sorry! File not found!');
        } else {

            // Create JSDOM "dom" object from html string data
            //const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
            const dom = new JSDOM(html_code);
            const $ = require("jquery")(dom.window);

            // Get element by tag name
            //console.log(dom.window.document.querySelector("p").textContent);    // test

            // JSDOM selector test
            dom.window.document.getElementById("message").textContent = "Holla";
            dom.window.document.getElementById("name").textContent = "You";

            // JQuery selector test
            $("#jq_message").html("This text generated from Node " + process.version + " by JQuery");

            // Return HTML page/code
            //response.write(html_code);            // Returns string of html code
            //response.write(dom);                  // ERROR: Received an instance of JSDOM
            response.write(dom.serialize());        // FIX: Serializing dom-object to html-code
        }
        response.end();
    }); //<--fs.readFile

}); //<--server

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
