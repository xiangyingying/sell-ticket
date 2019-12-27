/* 分类列表接口 */
const puppeteer=require('puppeteer')
const url ="https://www.ireader.com/"
async function classify(){
    const browser= await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle2'
    })
    await page.waitFor(1000)
    await page.hover(".content")
    let res=await page.evaluate(()=>{
        var $=window.jQuery
        var items1=$(".pubBook .conBigTitle p a");
        /* 出版图书 */
        var pubTitle=[];
        if(items1.length>0){
            items1.each((index,item)=>{
                var title=$(item).text();
                var href=$(item).attr("href");
                var cid=href.substr(-3,3).replace(/^=/,"");
                var pid=href.slice(50,52)
                pubTitle.push({
                    href,
                    title,  
                    cid,
                    pid                
                })
            })           
        }
        /* 男频 */
        var items2=$(".dif_Area .conBigTitle p a");
        var maleTitle=[];
        if(items2.length>0){
            items2.each((index,item)=>{
                var title=$(item).text();
                var href=$(item).attr("href");
                var cid=href.substr(-3,3).replace(/^=/,"");
                var pid=href.slice(50,52)
                maleTitle.push({
                    href,
                    title,    
                    cid,
                    pid              
                })
            })           
        }
        /* 女频 */
        var items3=$(".dif_Area .conBigTitle p a");
        var femaleTitle=[];
        if(items3.length>0){
            items3.each((index,item)=>{
                var title=$(item).text();
                var href=$(item).attr("href");
                var cid=href.substr(-3,3).replace(/^=/,"");
                var pid=href.slice(50,52)
                femaleTitle.push({
                    href,
                    title, 
                    cid,
                    pid                 
                })
            })           
        }
        return {pubTitle,maleTitle,femaleTitle}
    })
    browser.close();
    return res;
}
module.exports=classify