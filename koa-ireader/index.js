const Router=require('koa-router')
const router=new Router();
const Koa=require('koa');
const app=new Koa();
const cors=require('koa2-cors');
/* 导入 */
const main=require('./reptile/main')
const search=require('./reptile/search')
const classify=require('./reptile/classify.js')
const contents=require('./reptile/booksContent.js')
const detail=require('./reptile/bookDetail')
const classDetail=require('./reptile/classDetail')
/* 轮播 */
router.get("/book/list",async ctx=>{
    var data = await main();
    ctx.body = data;
})
/* 搜索 */
router.get('/book/search',async ctx=>{
    var {keyword}=ctx.query;
    console.log(keyword)
    var url=`https://www.ireader.com/index.php?ca=search.index&keyword=${keyword}`;
    var data=await search(url);
    ctx.body=data
})
/* 分类列表 */
router.get('/book/class',async ctx=>{
    var data = await classify();
    ctx.body = data;
})
/* 书籍内容 */
router.get("/book/contents",async ctx=>{
    var {cid,bid}=ctx.query;
    var url=`https://www.ireader.com/index.php?ca=Chapter.Index&pca=Chapter.Index&bid=${bid}&cid=${cid}`
    var data=await contents(url)
    ctx.body=data
})
/* 书籍详情 */
router.get('/book/detail',async ctx=>{
    var {bid}=ctx.query;
    var url=`https://www.ireader.com/index.php?ca=bookdetail.index&pca=channel.index&bid=${bid}`
    var data=await detail(url);
    ctx.body=data
})
/* 列表详情 */
router.get('/book/classDetail',async ctx=>{
    var {pid}=ctx.query;
    var url=`https://www.ireader.com/index.php?ca=booksort.index&pca=channel.index&pid=${pid}`
    var data=await classDetail(url);
    ctx.body=data
})
app.use(cors())
app.use(router.routes())
app.listen(8080)