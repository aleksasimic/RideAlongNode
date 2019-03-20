const path=require('path');


module.exports={

    entry:'./src/index2.js',
    //devtools: 'source-map',
    output:{
        
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    watch:true,
 
}