const fs = require('fs');
const { default: router } = require('./src/router');
folder_names = fs.readdirSync('./src/views');
base_path = "/";
routes = [];
base_dir = '../src/views';
create_route = (folder)=>{
    name = folder.split("/").reverse()[0];
    path = '/'+name;
    return {
        name,
        path
    }
}

add_routes = (folders,index)=>{
    
}
