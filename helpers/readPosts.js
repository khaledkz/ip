const fs = require('fs');

const filePath = __dirname + '/../data/posts.json';
/*
    To use this function, pass a callback that takes error as a first parameter and the postJSON as the second one
    i.e. readPosts((error, posts) => {
        if(error) {
            // handle error
        } else {
            // do something with "posts""
        }
    })
*/
const readPosts = (callback) => {
    fs.readFile(filePath, (error, fileBuffer) => {
        if(error) {
            console.error(error);
            return callback(error);
        }
        // Get the string out of the file buffer
        const file = fileBuffer.toString();

        // convert to an object
        const posts = JSON.parse(file);

        // return the object to the callback
        callback(error, posts);
    });
}

module.exports = readPosts;

