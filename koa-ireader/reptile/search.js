/* 搜索接口 */
const puppeteer=require('puppeteer')
async function search(url){
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(1000)
    await page.hover(".search")
    let res=await page.evaluate(()=>{
        var $=window.jQuery
        var items=$(".conLeft .sResult li");
        var links=[];
        if(items.length>0){
            items.each((index,item)=>{
                var imgUrl=$(item).find(".cf a img").attr("src");
                var href=$(item).find(".cf a").attr("href");
                var bid=href.substr(-8,8);
                var author=$(item).find(".bookMess .author").text().trim().replace(/\s/g,"");
                var title=$(item).find(".bookMess a h3").text();
                var desc=$(item).find(".brief").text();
                links.push({
                    imgUrl,
                    href,
                    title,
                    author,
                    desc,
                    bid
                })
            })           
        }
        var lines=$(".conRight ul .posr");
        var posr=[];
        if(lines.length>0){
            lines.each((index,item)=>{
                var imgUrl=$(item).find("a img").attr("src");
                var href=$(item).find("a").attr("href");
                var bid=href.substr(-8,8);
                var name=$(item).find(".bookMess a h3").text();
                var author=$(item).find(".bookMess .author").text();
                var wordsNum=$(item).find(".bookMess p:nth-of-type(2)").text();
                posr.push({
                    imgUrl,
                    href,
                    name,
                    author,
                    wordsNum,
                    bid
                })
            })           
        }
        var books=[];
        books.push({links,posr})
        return {books}
    })
    browser.close();
    return res;
}
module.exports=search