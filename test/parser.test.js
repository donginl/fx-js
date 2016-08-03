const parser = require('../lib/parser');

const currency = [
    {name: '일본 엔', code: 'JPY'},
    {name: '중국 위안', code: 'CNY'},
    {name: '유럽연합 유로', code: 'EUR'},
    {name: '영국 파운드', code: 'GBP'}
];
const bank = [
    {name: '신한은행', code: 'SHINHAN'},
    {name: '우리은행', code: 'WOORI'},
    {name: 'KB국민은행', code: 'KOOKMIN'},
    {name: 'KEB하나은행', code: 'KEBHANA'},
];


describe('파싱 라이브러리 테스트', () => {
    describe('비자카드의 환율을 가져와본다', () => {
        for (var i = 0; i < currency.length; i++) {
            var data = currency[i];
            it(`${data.name} 환율 정보를 정상적으로 가져와야한다`, (done) => {
                parser.parse('V', data.code)
                    .then(rate => done())
            });
        }
    });

    /* describe('마스터카드의 환율을 가져와본다', () => {
        for (var i = 0; i < currency.length; i++) {
            let data = currency[i];
            it(`${data.name} 환율 정보를 정상적으로 가져와야한다`, (done) => {
                parser.parse('MA', data.code)
                    .then(rate => done())
            });
        }
    }); */

    describe('시중은행의 환율을 가져와본다', () => {
        for (var i = 0; i < bank.length; i++) {
            var data = bank[i];
            it(`${data.name} 환율 정보를 정상적으로 가져와야한다`, (done) => {
                parser.parse(data.code)
                    .then(rate => done())
            });
        }
    });
});