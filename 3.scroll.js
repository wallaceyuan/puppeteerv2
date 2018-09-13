/**
 * Created by yuanyuan on 2018/9/1.
 */
//promise + async + await
let puppeteer = require('puppeteer')

    ;
(async()=> {
    let bowser = await puppeter.launch({
        headless: false,
        executablePath: ''
    })

    let page = bowser.newPage()
    await page.goto('https://account.36rcom')
    await page.click('#kr-shield-com')
    let {left,top} = await page.evaluate(()=> {
        let $ = window.$
        let left = $('').offset().left - $(window).scrollLeft() + 10
        let top = $('').offset().top - $(window).scrollTop() + 10
        return {left, top}
    })

    let distance =dragEle()

    page.mouse.click(left,top,{delay:2000})
    page.mouse.down(left,top)
    page.mouse.move(left+distance-10,topm,{steps:30})
    await page.waitFor(800)
    page.mouse.up()

})();


async function dragEle() {
    let distance = await page.evaluate(()=>{
        let ele1 = document.querySelector('.geetet_canvase').getContext('2d')
        let ele2 = document.querySelector('.geetet_canvase_bg').getContext('2d')
        let result = []

        for(let i = 50;i<260;i++){
            for(let j= 0;j<160;j++){
                let data1 = ele1.getImageData(i,j,1,1).data;//[t,g,b,a]
                let data2 = ele2.getImageData(i,j,1,1).data;//[t,g,b,a]

                let res1 = data1[0] - data2[0]
                let res2 = data1[1] - data2[1]
                let res3 = data1[2] - data2[2]

                if(!(res1<30 && res2<30 && res3<30)){
                    result.push(i)
                }

            }
        }
        return result[0]
    })
}