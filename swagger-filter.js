const yaml = require('js-yaml');
const fs = require('fs');
  

try {
    // Get .yml in command line argument
    var args = String(process.argv.slice(2));
    // Convert YAML in JS Object
    const config = yaml.safeLoad(fs.readFileSync(args, 'utf8'));
    const configPrivate = JSON.parse(JSON.stringify(config));
    const configPublic = JSON.parse(JSON.stringify(config));

    const privateVariable = 'x-private-filter';
    const publicVariable = 'x-public-filter';

    // Loop through each path
    Object.keys(config.paths).forEach(function(primaryKey) {
        Object.keys(config.paths[primaryKey]).forEach(function(secondaryKey) {
            // Check for any privateFilter boolean
            if(config.paths[primaryKey][secondaryKey][privateVariable]){
                delete configPublic.paths[primaryKey][secondaryKey];
            }else if(config.paths[primaryKey][secondaryKey][publicVariable]){
                delete configPrivate.paths[primaryKey][secondaryKey];
            }
        });
    });
    //convert to JSON
    const indentedJsonPublic = JSON.stringify(configPublic, null, 4);
    fs.writeFileSync('swagger-filter-public.json', indentedJsonPublic);
    const indentedJsonPrivate = JSON.stringify(configPrivate, null, 4);
    fs.writeFileSync('swagger-filter-private.json', indentedJsonPrivate);
} catch (e) {
    console.log(e);
}

