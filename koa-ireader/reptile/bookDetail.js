/* 书本详情 */
const puppeteer=require('puppeteer')
async function detail(url){
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(1000)
    await page.hover(".content")
    let res=await page.evaluate(()=>{
        var $=window.jQuery
        var list = $(".sqCon .allCom ul li");
        /* 评论 */
        var comments= [];
        if(list.length>0){
            list.each((index,item)=>{
                var headImg = $(item).find(".headImg img").attr("src");
                var userName=$(item).find(".allCom .ComMan p").text();
                var lv=$(item).find('.ComMan .lv').text();
                var pubTime=$(item).find('.ComMan span:nth-of-type(2)').text();
                /* 书评 */
                var disTxt=$(item).find(".comTxt i a").text();
                var liked=$(item).find(".attend a:nth-of-type(1) i").text();
                var comment=$(item).find(".attend a:nth-of-type(2) i").text();
                comments.push({
                    headImg,userName,lv,pubTime,disTxt,liked,comment
                })
            })
        }
        var peopleNum=$(".title p span:nth-of-type(3)").text();
        /* 书本详情 */
        var booksInfo=$(".bookInfor")
        var img=$(booksInfo).find(".bookL a img").attr("src");
        var classify=$(booksInfo).find(".bookL s").text();
        var news=$(booksInfo).find(".new p a").text().trim().replace(/\s/g,"");
        var newsTime=$(booksInfo).find(".time p").text()
        var title=$(booksInfo).find(".bookname h2 a").text();
        var author=$(booksInfo).find(".author").text();
        var wordsNum=$(booksInfo).find(".bookinf01 p span:nth-of-type(2)").text();
        var fansNum=$(booksInfo).find(".bookinf01 p span:nth-of-type(3) b").text();
        var likedNum=$(booksInfo).find(".bookinf01 p span:nth-of-type(4) b").text();
        var desc=$(booksInfo).find(".bookinf03 p").text().trim().replace(/\s/g,"");
        var href=$(booksInfo).find(".bookinf02 .left a").attr("href");
        var cid=href.substr(-1,1);
        var pid=href.substr(-14,14).slice(0,8)
        var data=[];
        data.push({classify,img,title,author,desc,news,newsTime,wordsNum,fansNum,likedNum,href,comments,peopleNum,cid,pid})
        return ({
            data
        })
    })
    browser.close();
    return res;
}
module.exports=detail