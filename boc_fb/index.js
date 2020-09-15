const findChrome = require('chrome-finder');
const chromePath = findChrome();
const puppeteer = require('puppeteer');
var process = require('process');
const cheerio = require('cheerio');
var fs = require('fs');
const axios = require('axios');
var request = require("request");


async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    });
};

bocFacebook = async (soSim) => {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');
        const cookieJson = fs.readFileSync(process.cwd()+'/boc_fb/cookie.json', 'utf8');
        cookieJson2 = JSON.parse(cookieJson);
        await page.setCookie(...cookieJson2);
        await page.waitFor(1000);
        
        await page.goto('https://www.facebook.com/search/top/?q=' + soSim,{"waitUntil" : "networkidle2"});
        await page.setViewport({
            width: 1200,
            height: 800
        });
        await autoScroll(page);
        bodyHTML = await page.evaluate(function () { return document.body.innerHTML; });
        const $ = cheerio.load(bodyHTML);
        const results = $('._6-cm');
        var json = [];
        await browser.close();
        results.each((i, elem) => {
            const htmltext = ($(elem).html());
            var rest = htmltext.match(/href="([^"]*")/g);
            
            if (rest) {
                rest = rest[0].replace('href="', '').replace('"', '');
                const rip = rest.replace('amp;', '')

                if( !rest[0].startsWith('http') ){
                    rest = 'https://facebook.com' + rip;
                    if( rest.indexOf('posts') != -1 ) {
                        json.push({link: rest})
                    }
                }
            }
            // console.log(rest)
        });
        // console.log(results)
        return json;
    }
    catch (error){
        console.log(error);
        return false;
    }
    
};

linkProfile = async (link) => {
    // console.log(link)
    try {
        var linkSplit = await link.split('/');
        var linkProfile = await linkSplit[0] + '//facebook.com/' + linkSplit[3];
        return linkProfile;
    } catch (error) {
        console.log(error);
        return false;
    }
};

async function autoScrollProfile(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;
                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 50);
        });
    });
};


bocProfileFacebook = async (link) => {
    try {
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox']  });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');
        const cookieJson = fs.readFileSync(process.cwd()+'/boc_fb/cookie.json', 'utf8');
        cookieJson2 = JSON.parse(cookieJson);
        await page.setCookie(...cookieJson2);
        await page.waitFor(1000);
        
        const response = await page.goto(link,{"waitUntil" : "networkidle2"}); 
        await page.setViewport({
            width: 1200,
            height: 800
        });
        await autoScrollProfile(page);
        bodyHTML = await page.evaluate(function () { return document.body.innerHTML; });
        const $ = cheerio.load(bodyHTML);
        if(link.indexOf('groups')) {
            var results = $('.t_fjkrkbqua a');
        } else {
            var results = $('._5pcq');
        }
        await browser.close();
        var json = [];
        results.each((i, elem) => {
            let _this = $(this);
            const htmltext = ($(elem).attr());
            var rest = htmltext.href;
            // console.log(rest)
            if (link.indexOf('groups') && 
                rest.indexOf('permalink') != -1 ||
                rest.indexOf('photo.php?') != -1 ||
                rest.indexOf('posts') != -1) {
                // json.push(rest)
                if (rest.indexOf('https://www.facebook.com') <= -1 ) {
                    var listLink = 'https://www.facebook.com' + rest;
                }else {
                    listLink = rest
                };
                json.push({link: listLink});
                // console.log(listLink);
            };
        });
        return json
    }
    catch (error){
        console.log(error);
        return false;
    };
}; 

crawlerListLink = async(listLink) => {
    // console.log(listLink)
    if (!listLink) {
        return false;
    }
    var listSimCrawler = [];
    listLink.forEach((ele, index) => {
            var promiseCrawler = ele.link;
            listSimCrawler.push(promiseCrawler);
    });    
    return listSimCrawler;
};

crawlink = async(link) => {
    // console.log(link)
    try {
        const contentCraw = await axios.get(link);
        let data = contentCraw.data || false;
        // console.log(data)
        // console.log(data)
        return await data
    } catch (error) {
        console.log('sai crawLink');
        return [];
    };
}; 

contentDetail = async(data) => {
    try {
        const $ = cheerio.load(data);
        if (!data) return;
        let results =   $('code#u_0_15').html() ||
                        $('code#u_0_1c').html() ||
                        $('code#u_0_13').html() ||
                        $('code#u_0_12').html() ||
                        $('code#u_0_q').html() ||
                        $('code#u_0_r').html() ||
                        $('code#u_0_19').html() ||
                        $('code#u_0_16').html() ||
                        $('code#u_0_t').html() ||
                        $('code#u_0_s').html() ||
                        $('code#u_0_u').html() ||
                        $('code#u_0_1g').html() ||
                        $('code#u_0_v').html() ||
                        $('code#u_0_x').html() ||
                        $('code#u_0_y').html() ||
                        $('code#u_0_1b').html() ||
                        $('code#u_0_1f').html() ||
                        $('code#u_0_w').html() ||
                        $('code#u_0_17').html() ||
                        $('code#u_0_14').html() ||
                        $('code#u_0_1h').html() ||
                        $('code#u_0_18').html() ||
                        $('[data-testid=post_message]').html();
        return results;
    } catch (error) {
        return [];
    };
}; // raw data 

crawlerLinkDetail = async(data) => {
    try {
    // console.log(data)
        var listSim = [];
        var dataBody = data.replace('<!--', '').replace('-->', '');
        const $ = cheerio.load(dataBody);
        const bodyContent = $('[data-testid=post_message] p') ||
                            $('[data-testid=post_message] span');
        const resultsArr = [];
        // console.log($(bodyContent))
        $(bodyContent).each(function(i, link){    
            var sop = $(this).html();
            if(sop.indexOf('<br>') >= 1 ) {
                var sopBr = sop.split('<br>');
                sopBr.forEach((v2)=>{
                    if(v2.length <= 21 || v2.indexOf('0') >= 0) {
                        let v3 = v2.replace(/<.*>|==|\s|_|([A-QU-Zsa-qu-zs])|#|&|;/g, '=');
                        resultsArr.push(v3);
                        // console.log(v3)
                    };
                });
            };
            if(sop.length <= 22 ){
                resultsArr.push(sop);
            }
        });
        resultsArr.map(ele => {
        let crawlerContent = ele.split('=');
        if (crawlerContent <= 2) {
            var beforeSoSim = crawlerContent[0] ||
                                crawlerContent[1];
        } else {
            var beforeSoSim = 0;
        };
        if(crawlerContent.length >= 2 ) {
            var beforeSoSim = crawlerContent[0] ||
                                crawlerContent[1] ||
                                crawlerContent[2] ||
                                crawlerContent[3] ||
                                crawlerContent[4] ||
                                crawlerContent[5] ||
                                crawlerContent[6] ||
                                crawlerContent[7] ||
                                crawlerContent[8] ||
                                crawlerContent[9] ||
                                '0';
        }
        if(beforeSoSim.length >= 10) {
            var soSim = beforeSoSim;
        } else {
            var soSim = '';
        };
        if (crawlerContent <= 2) {
            var beforePrice = crawlerContent[1] ||
                                crawlerContent[0];
        };

        if ( crawlerContent.length >= 2 ) {
            var beforePrice = crawlerContent[9] ||
                                crawlerContent[8] ||
                                crawlerContent[7] ||
                                crawlerContent[6] ||
                                crawlerContent[5] ||
                                crawlerContent[4] ||
                                crawlerContent[3] ||
                                crawlerContent[2] ||
                                crawlerContent[1] ||
                                crawlerContent[0] ||
                                0;
        } else {
            var beforePrice = 0;
        };

        if(beforePrice.length <= 9){
            var price = beforePrice
        } else {
            var price = 0;
        };
        if(soSim !== undefined) {
            var sim = soSim.replace(/[^0-9]+/g, "");
        };
        if (sim !== undefined && 
            sim.length >= 9 &&  
            sim.length <= 12) {
            var dataEnd = { soSim,
                            sim,
                            price
                            
                            };
            listSim.push(dataEnd);
            };
        });
        // console.log(listSim);
    return listSim;
    } catch (error) {
        return [];
    }
    
}; //craw number phone

crawlerPageDetail = async (results) => {
    try {
        const listSim = [];
        var dataBody = results.replace('<!--', '').replace('-->', '');
        const $ = cheerio.load(dataBody);
        const bodyContent = $('[data-testid=post_message] p') ||
                            $('[data-testid=post_message] span');
        const resultsArr = [];
        $(bodyContent).each(function (i, link){
            var sop = $(this).html();
            if(sop.indexOf('<br>') >= 1 ) {
                var sopBr = sop.split('<br>')
                sopBr.forEach((v2)=>{
                    if(v2.length <= 21 ||
                       v2.indexOf('0') >= 0) {
                        let v3 = v2.replace(/<.*>|==|\s|_|([A-QU-Zsa-qu-zs])|#|&|;|2014/g, '=');
                        resultsArr.push(v3);
                    };
                });
            };
            if(sop.length <= 22 ){
                resultsArr.push(sop);
            }
        });
        resultsArr.map(ele => {
        let crawlerContent = ele.split('=');
        if (crawlerContent <= 2) {
            var beforeSoSim = crawlerContent[0] ||
                              crawlerContent[1];
        } else {
            var beforeSoSim = 0;
        };
        if(crawlerContent.length >= 2 ) {
            var beforeSoSim = crawlerContent[0] ||
                              crawlerContent[1] ||
                              crawlerContent[2] ||
                              crawlerContent[3] ||
                              crawlerContent[4] ||
                              crawlerContent[5];
        }
        if(beforeSoSim.length >= 10) {
            var soSim = beforeSoSim;
        } else {
            var soSim = '';
        };
        if (crawlerContent <= 2) {
            var beforePrice = crawlerContent[1] ||
                              crawlerContent[0];
        };

        if ( crawlerContent.length >= 2 ) {
            var beforePrice = crawlerContent[5] ||
                              crawlerContent[4] ||
                              crawlerContent[3] ||
                              crawlerContent[2] ||
                              crawlerContent[1] ||
                              crawlerContent[0];
        } else {
            var beforePrice = 0;
        };

        if(beforePrice.length <= 9){
            var price = beforePrice
        } else {    
            var price = 0;
        };
        if(soSim !== undefined) {
            var sim = soSim.replace(/[^0-9]+/g, "");
        };
        if (sim !== undefined && 
            sim.length >= 9 &&  
            sim.length <= 12) {
            var dataEnd = { soSim,
                            sim,
                            price
                            
                            };
            listSim.push(dataEnd);
            };
        });
        return listSim
    } catch (error) {
        return [];
    }; 
}; // craw page

crawlerUserDetail = async (content) => {
    try {
    var dataBody = content.replace('<!--', '').replace('-->', '');
	const $_1 = cheerio.load(dataBody);
    const results_user = $_1('span.fwb').text();
    const results_time = $_1('span.timestampContent').text();
    const data = [{ user: results_user, time: results_time }]
    return data;

    // console.log(results_body)
    } catch (error) {
        return [];
    }
    
}; // craw name profile

originalContent = async (content) => {
    try {
        var dataBody = content.replace('<!--', '').replace('-->', '');
        const $ = cheerio.load(dataBody);
        const bodyContent = $('[data-testid=post_message]').text();

        return bodyContent;
        } catch (error) {
            return [];
        };
}; // craw content

upStatus = (ele) => {
    let num = Number(ele);
    num += 1;
    return num;
}; // up status

findSim = (listSim, needSim) => {
    let phone = needSim.replace(/[^0-9]+/g, '')
    const found = listSim.find(element => element.sim == phone);    
    const err = { sim: '', price: 'not found' }
    if(found) {
        return found;
    } else {
        return err;
    };
}; // find number phone

module.exports = {
    bocFacebook,
    linkProfile,
    bocProfileFacebook,
    crawlerListLink,
    crawlink,
    contentDetail,
    crawlerLinkDetail,
    crawlerPageDetail,
    crawlerUserDetail,
    originalContent,
    upStatus,
    findSim
};
