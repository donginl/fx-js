'use strict';
const cheerio = require('cheerio'),
    moment = require('moment-timezone'),
    request = require('request'),
    util = require('util'),
    xml2js = require('xml2js').parseString;

class Parser {
    parseVisa(currency) {
        return new Promise((resolve, reject) => {
            let date = moment().tz('America/Los_Angeles').format('MM-DD-YYYY');
            request(util.format('https://travel.visa.com/xborder/currency/exchangeRate/%s/USD/0/%s.json', currency, date), (err, response) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    let body = JSON.parse(response.body),
                        rate = body.Exchange.exchRate;
                    if (rate) resolve(rate);

                    reject()
                } else {
                    reject()
                }
            })
        })
    }

    parseMaster(currency) {
        return new Promise((resolve, reject) => {
            let date = moment().tz('America/Los_Angeles').format('MM-DD-YYYY');
            request(util.format('http://www.mastercard.com/psder/eu/callPsder.do?service=getExchngRateDetails&baseCurrency=%s&settlementDate=%s', currency, date), (err, response, body) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    xml2js(body, {trim: true}, (err, result) => {
                        if (err) reject(err);

                        let rate = result.PSDER.TRANSACTION_CURRENCY[0].TRANSACTION_CURRENCY_DTL[44].CONVERSION_RATE[0];
                        if (rate) resolve(rate);

                        reject()
                    });
                } else {
                    reject()
                }
            })
        })
    }

    parseKEBHana() {
        return new Promise((resolve, reject) => {
            request('http://community.fxkeb.com/fxportal/jsp/RS/DEPLOY_EXRATE/fxrate_all.html', (err, response, body) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    let $ = cheerio.load(body),
                        rate = $('.buy').eq(4).text();

                    if (rate) resolve(rate);

                    reject()
                } else {
                    reject()
                }
            })
        })
    }

    parseWoori() {
        return new Promise((resolve, reject) => {
            request('https://spot.wooribank.com/pot/jcc?withyou=FXCNT0002&__ID=c005498&rc=2&lang=KOR', (err, response, body) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    let $ = cheerio.load(body),
                        rate = $('td').eq(1).text().replace(',', '');

                    if (rate) resolve(rate);

                    reject()
                } else {
                    reject()
                }
            })
        })
    }

    parseShinhan() {
        return new Promise((resolve, reject) => {
            let date = moment().tz('Asia/Seoul').format('YYYY/MM/DD');
            request.post('https://m.shinhan.com/bank/mbw/jsp/callMbwGuestCommonService.jsp', {
                form: {
                    plainXML: util.format("<?xml version='1.0' encoding='UTF-8' ?><S_RIBF3730 language='ko' requestMessage='S_RIBF3730' responseMessage='R_RIBF3730' serviceCode='F3730'><조회구분 value='1'/><조회일자 value='%s'/><고시회차 value='27'/></S_RIBF3730>", date),
                    svc: "F3730"
                },
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17',
                    'Referer': 'https://m.shinhan.com/pages/financialInfo/exchange_rate_gold/exchange_rate.jsp'
                }
            }, (err, response, body) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    xml2js(body, {trim: true}, (err, result) => {
                        let rate = result.R_RIBF3730.조회내역[0].vector[0].data[0].R_RIBF3730_1[0].전신환매도환율[0].$.originalValue;

                        if (rate) resolve(rate);

                        reject()
                    })
                } else {
                    reject()
                }
            })
        })
    }

    parseKookmin() {
        return new Promise((resolve, reject) => {
            request.get('https://obank.kbstar.com/quics?page=C018704', {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13E238 Safari/601.1',
                    'Referer': 'https://obank.kbstar.com/quics?page=C018676'
                }
            }, (err, response, body) => {
                if (err) reject(err);
                if (response.statusCode == 200) {
                    let $ = cheerio.load(body),
                        rate = $('.ar').eq(2).text().replace(',', '');

                    if (rate) resolve(rate);

                    reject()
                } else {
                    reject()
                }
            })
        })
    }

}

module.exports = new Parser();