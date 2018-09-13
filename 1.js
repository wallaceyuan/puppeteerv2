/**
 * Created by yuanyuan on 2018/9/1.
 */
//promise + async + await


;(async()=>{
    let bowser = await puppeter.launch({
        headless:false,
        executablePath:''
    })

    let page = bowser.newPage()
    await page.goto('baidu.com')


    let downloadPath = path.resolve(__dirname,'download')
    let count = 0
    let MIN_SIZE = 5*1024
    page.on('response',async(res)=>{
        console.log(res)
        let header = res.headers()
        if(header['content-type'] = 'image'){
            if(header['content-lenth'] > MIN_SIZE){
                let buffer = await res.buffer()
                let extName = header['content-type'].split('/')[1]
                fs.writeFile(`${downloadPath}/${count++}.${extName}`,buffer,()=>{
                    console.log(`${downloadPath}/${count++}.${extName}:ok`)
                })
            }
        }

    })


    await page.evalute(()=>{
        return new Promise((resolve,reject)=>{
            let pos = 0
            let i = 0
            let timer = setInterval(()=>{
                window.scrollBy(0,100)
                let scrollTop = document.documentElement.scrollTop
                if(scrollTop == pos){
                    if( i > 100){
                        clearInterval(timer)
                        resolve()
                    }else{
                        i ++
                    }
                }else{
                    pos = scrollTop
                    i = 0
                }
            },100)
        })
    })

})();