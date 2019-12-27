/* 书本阅读内容 */
const puppeteer=require('puppeteer')
async function contents(url){
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(1000)
    await page.hover(".content")
    let res=await page.evaluate(()=>{
        var $=window.jQuery;
        /* 章节 */
        var lists=$(".article p")
        var booksContent=[];
        if(lists.length>0){
            lists.each((index,item)=>{
                var contents=$(item).text();
                booksContent.push({contents}) 
            })          
        }
        /* 目录 */
        var lists2=$(".conList ul li");
        var conList=[];
        if(lists2.length>0){
            lists2.each((index,item)=>{
                var contents=$(item).find("a").text();
                var dataCid=$(item).find("a").attr("data-cid");
                conList.push({contents,dataCid}) 
            })          
        }
        /* 下一页id */
        var dataCid=$(".chapter span:nth-of type(2)").attr("data-cid")
        /* 题目 */
        var title=$(".header .headLeft i a").text()
        var booksContents=[];
        booksContents.push({booksContent,title,dataCid,conList})
        return {booksContents}
    })
    browser.close();
    return res;
}
module.exports=contents