const withImages = require('next-images')
module.exports = withImages({
    webpack(config,options){
        return config
    }
/*
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: [
                {
                    loader: 'file-loader',
                    options:{
                        name:'[name].[contenthash].[ext]',
                        outputPath:'static',
                        publicPath:'_next/static'
                    }
                },
            ],
        })

        return config
    },
*/
})