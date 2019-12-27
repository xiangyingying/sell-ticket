/* 主页面 */
const puppeteer = require("puppeteer")
const url ="https://www.ireader.com/"
async function main(){
    const broswer = await puppeteer.launch();
    const page = await broswer.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(2000)
/*     await page.hover(".book_wrap") */
    let res = await page.evaluate(()=>{
        var $ = window.jQuery;
        /* 轮播 */
        var lis1 = $("#recommend_book_lunbo_ul .little");
        var banners =[];
        if(lis1.length>0){
            lis1.each((index,item)=>{
                var imgUrl=$(item).find("a img").attr("src");
                var href=$(item).find("a").attr("href");
                var bid=href.substr(-8,8);
                var content=$(item).find("span").text();
                var title=$(item).find("a").attr("title")
                banners.push({
                    imgUrl,
                    href,
                    content,
                    title,
                    bid
                })
            })
        }
        /* 出版图书 */
        var lis2 = $(".pubBook .show .showMid li");
        var pubBooks = []
        if(lis2.length>0){
            lis2.each((index,item)=>{
                var imgUrl = $(item).find("a img").attr("src");
                var href = $(item).find("a").attr("href");
                var bid=href.substr(-8,8);
                var name=$(item).find(".bookName a").text().trim().replace(/\s/g,"");
                var author=$(item).find("p:nth-of-type(2)").text().trim().replace(/\s/g,"");
                pubBooks.push({
                    imgUrl,
                    href,
                    name,
                    author,
                    bid
                })
            })
        }
        /* 精选圈子 */
        var lis3 =$(".sel_Cir .cirBig li");
        var cirShows =[];
        if(lis3.length>0){
            lis3.each((index,item)=>{
                var imgUrl = $(item).find(".cirHead a img").attr("src");
                var href=$(item).find(".cirHead a").attr("href");
                var cid=href.substr(-1,1)
                var title = $(item).find("h3 a").text();
                var content=$(item).find(".little").text();
                var lauds = $(item).find(".attent i:nth-of-type(1)").text();
                var comments = $(item).find(".attent i:nth-of-type(2)").text();
                cirShows.push({
                    imgUrl,
                    href,
                    title,
                    content,
                    lauds,
                    comments,
                    cid
                })
            })
        }
        /* 征文大赛进行时 */
        var lis4 = $(".sel_Cir .cirLittle li");
        var cirContesting = [];
        if(lis4.length>0){
            lis4.each((index,item)=>{
                var imgUrl = $(item).find(".litHead a img").attr("src");
                var href = $(item).find(".litHead a").attr("href");
                var cid=href.substr(-14,14).slice(0,3).replace(/^_/,"")
                var title = $(item).find(".bookCon a").text();
                var contentNum=$(item).find(".bookCon p").text();
                cirContesting.push({
                    imgUrl,
                    href,
                    title,
                    contentNum,
                    cid
                })
            })
        }
        /* 男生频道 */
        var lis5 = $(".dif_Area .showMid li");
        var maleArea = [];
        if(lis5.length>0){
            lis5.each((index,item)=>{
                var href = $(item).find("h3 a").attr("href");
                var bid=href.substr(-8,8)
                var name = $(item).find(".name i").text();
                var introduce=$(item).find(".introduce").text();
                maleArea.push({
                    href,
                    name,
                    introduce,
                    bid
                })
            })
        }
        /* 热销榜频道 */
        var lis6 = $(".dif_Area .showRight li");
        var femaleArea = [];
        if(lis6.length>0){
            lis6.each((index,item)=>{
                var imgUrl = $(item).find(".bookPic a img").attr("src");
                var href = $(item).find(".bookPic a").attr("href");
                var bid=href.substr(-8,8);
                var name = $(item).find(".bookCon a").text();
                var readNum=$(item).find(".num").text();
                femaleArea.push({
                    imgUrl,
                    href,
                    name,
                    readNum,
                    bid
                })
            })
        }
        /* 畅销榜 */
        var lis7 = $(".pubBook .showRight ul li");
        var sellWell = [];
        if(lis7.length>0){
            lis7.each((index,item)=>{
                var imgUrl = $(item).find(".open .bookPic a img").attr("src");
                var href = $(item).find(".open .bookPic a").attr("href");
                var bid=href.substr(-8,8)
                var name = $(item).find(".open .bookCon p a").text();
                var readNum=$(item).find(".open .bookCon .num").text();
                sellWell.push({
                    imgUrl,
                    href,
                    name,
                    readNum,
                    bid
                })
            })
        }
        return {banners,pubBooks,cirShows,cirContesting,maleArea,femaleArea,sellWell}
    })
    broswer.close();
    return res;
}
module.exports = main;
