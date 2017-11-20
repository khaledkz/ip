const fs = require('fs');
const filePath = __dirname + '/../data/posts.json';

/*
    To use this function, pass a callback that takes error as a parameter
    i.e. savePost(newPost, (error) => {
        if(error) {
            // handle error
        } else {
            // newPost was saved correctly
        }
    })
*/

const savePost = (newPost, callback) => {
    fs.readFile(filePath, (error, file) => {
        if(error) {
            console.error('error reading the file');
            console.error(error);
            return callback(error);
        }
        
        const posts = JSON.parse(file.toString());
        posts.splice(0, 0, newPost);

        fs.writeFile(filePath, JSON.stringify(posts, null, 2), (error) => {
            if (error) {
                console.error('error writing to the file');
                console.error(error);
                return callback(error);
            } 
            callback();
        });
    });
};

module.exports = savePost;
