require("es6-promise").polyfill();
require("isomorphic-fetch");

class model {
    constructor(){

    }
    //获取后台数据
    async fetchs(){
        await fetch('http://192.168.1.11:3001/api/block/controller/testFetch',{
            method:"post",
              headers:{
                  "Content-type":"application/x-www-form-urlencoded"
              },
              body:{name:"yzy",sex:"man"}
        })
        .then(function (response){
            if (response.status == 200){
                return response;
            }
        })
        .then(function (data) {
          return data;
        })
        .then(function(text){
            console.log("请求成功，响应数据为:",text);
        })
        .catch(function(err){
            console.log("Fetch错误:"+err);
        });
    }
}