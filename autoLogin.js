/**
 * Created by yuanyuan on 2018/9/1.
 */
let username = '1272864289@qq.com'
let password = 'abc123456'

let puppeteer = require('puppeteer')


;(async()=>{
    let browser = await puppeteer.launch({
        headless:false,
        executablePath:''
    })

    let page = bowser.newPage()
    await page.goto('https://accounts.douban.com/login')
    await page.type('#email',username,{delay:30})
    await page.waitFor(500)
    await page.type('#password',username,{delay:20})

    let imageSrc = await page.$eval('#captch——image',ele=>ele.src)
    let code = await validate(imageSrc)
    await page.type('#captch_file',code,{delay:20})
    await page.waitFor(1000)

    await page.click('.btn-submit')
    await page.waitForNavigation()
    await page.screenshot({path:'ok.png'})

})();