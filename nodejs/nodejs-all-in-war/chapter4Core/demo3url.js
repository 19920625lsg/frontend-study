const url = require('url');
const location = "https://search.jd.com/Search?keyword=caffe2&enc=utf-8&wq=caffe2&pvid=be00638f673749cb8d48b1a51101e657#123";
// obj中含有所需的所有信息
const urlObj = url.parse(location);
console.log(JSON.stringify(urlObj));