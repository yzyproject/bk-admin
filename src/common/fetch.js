require("es6-promise").polyfill();
require("isomorphic-fetch");
/**
 * 请求数据类
 */
export default class Fetchs{
    constructor(){
        
    }
    
    /**
     * 
     * @param { string } url 请求路径
     * @param { json } data 请求体参数
     * @param { boolean } boll 必传项,防止重复提交
     */
    async fetch (url,data,boll){
        let res,error;
        let obj = JSON.stringify(data)
        await fetch(url,{
            method:"post",
                body:obj
        })
        .then(function (response){
            if (response.status == 200){
                return response.text();
            }
            
        }).then((response)=>{
            res = JSON.parse(response) 
        })
        .catch(function(err){
            error = err
            // console.log("Fetch错误:"+err);
        });
        return res ? res : error;
    }
}