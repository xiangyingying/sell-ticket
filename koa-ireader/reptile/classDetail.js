/* 列表分类详情书籍*/
const puppeteer=require('puppeteer')
async function classDetail(url){
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(1000)
/*     await page.hover(".m-headerson") */
    let res=await page.evaluate(()=>{
        var $=window.jQuery
        /* 分类列表 */
        var items1=$(".genre .difgenre:nth-of-type(2) .right ul li");
        var items=[];
        if(items1.length>0){
            items1.each((index,item)=>{
                var name=$(item).find("a").text();
                /* 通过href跳转，获取href,在截取后四位数字作为id进行跳转,用数组其他办法会报错 */
                var href=$(item).find("a").attr("href");
                var pid=href.slice(0,76).substr(-2,2);
                var cid=href.slice(0,84).substr(-3,3).replace(/^=|&$/g,"")
                items.push({
                   name,href,pid,cid
                })
            })           
        }

        /* 热门 */
        var hots=$(".hot a").attr("href");
        var pid=hots.slice(0,76);
        var cid=hots.slice(0,84).substr(-3,3).replace(/^=|&$/g,"");
        var hotsorder=hots.substr(-17,17).slice(0,8)
        var news=$(".new a").attr("href");
        var newasorder=news.substr(-15,15).slice(0,6)
        var comments=$(".comment a").attr("href");
        var commentsorder=comments.substr(-14,14).slice(0,5)
        /* 书本信息 */
        var newShow=$(".newShow li");
        var booksList=[];
        if(newShow.length>0){
            newShow.each((index,item)=>{
                var img=$(item).find("a img").attr("src");
                var href=$(item).find("a").attr("href");
                var bid=href.slice(-8,8);
                var name=$(item).find(".bookMation h3 a").text();
                var author=$(item).find(".tryread").text().trim();
                var hrefRead=$(item).find(".tryread a").attr("href")
                var readNum=$(item).find(".bookMation span").text().trim().replace(/\s/g,"");
                var introduce=$(item).find(".introduce").text();
                booksList.push({
                   img,name,href,author,hrefRead,readNum,introduce,bid
                })
            })           
        }
        var lists=[];
        lists.push({items,hots,news,comments,booksList,pid,cid,hotsorder,newasorder,commentsorder})
        return {lists}
    })
    browser.close();
    return res;
}
module.exports=classDetail