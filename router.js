let express=require('express');
let search=require('./utils/search');
let api=express.Router();

api.route('/')
    .get(function (req,res) {
        let initlist={
            room:'',
            yue:'',
            zong:'',
            light:'',
            kongtiao:'',
            light_on:'',
            kongtiao_on:'',
            www:''
        };
        res.render('index',initlist);
    })
    .post(async function (req,res) {
        console.log('有人查询'+req.body.search+'寝室的数据');
        let url="http://172.16.0.130:8808/admin/sys!chaxun.action?fjmc="+req.body.search
        let itemlist=await search(url);
        console.log(itemlist);
        res.render('result',itemlist);
    })

module.exports=api;