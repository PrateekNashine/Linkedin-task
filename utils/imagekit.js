const ImageKit = require('imagekit');

exports.initImagekit = function () {
    var imagekit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLICKEY,
        privateKey: process.env.IMAGEKIT_PRIVATEKEY,
        urlEndpoint: process.env.IMAGEKIT_ENDPOINTURL
    });

    return imagekit;
};