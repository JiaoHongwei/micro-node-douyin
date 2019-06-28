// gRPC 相关依赖
var PROTO_PATH = __dirname + '/./service.proto';
var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

global.navigator = {
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1"
};


var hello_proto = grpc.loadPackageDefinition(packageDefinition);

function main() {
    var client = new hello_proto.CommonService('localhost:6565',
        grpc.credentials.createInsecure());

    var request = {};
    request.method = 'generateSignature';
    request.clazz = 'com.anoyi.douyin.rpc.RpcNodeDyService';
    request.args = '96956380265';
    var requ = {serialize: string2Bin("1"), request: string2Bin(JSON.stringify(request))};

    client.handle(requ, function (err, response) {
        var resp = JSON.parse(bin2String(response.response));
        console.log('signature: ' + resp.result);
    });
}

main();

/**
 * 字符串 -> 字节数组
 */
function string2Bin(str) {
    const buffer = Buffer.from(str, 'utf-8');
    return Array.prototype.slice.call(buffer, 0)
}

/**
 * 字节数组 -> 字符串
 */
function bin2String(array) {
    return new Buffer(array).toString('utf-8');
}
