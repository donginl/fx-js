# MagicFX

[![Build Status](https://travis-ci.org/donginl/magicfx.svg?branch=master)](https://travis-ci.org/donginl/magicfx)
[![NPM](https://img.shields.io/npm/v/magicfx.svg)](https://npmjs.org/package/quickotp)
[![NPM Downloads](https://img.shields.io/npm/dm/magicfx.svg)](https://npmjs.org/package/magicfx)
[![License](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/donginl/magicfx/blob/master/LICENSE)
[![Donate](https://img.shields.io/gratipay/donginl.svg)](https://gratipay.com/donginl)

비자카드, 마스터카드 그리고 국내 시중은행의 환율 정보를 받아오는 라이브러리입니다.
비자카드와 마스터카드 환율은 달러로 반환됩니다

## 요구조건
* ES6
* Node.js

## 지원하는 브랜드 및 은행
* 비자카드 (V)
* 마스터카드 (MA)
* 신한은행 (SHINHAN)
* 우리은행 (WOORI)
* KB국민은행 (KOOKMIN)
* KEB하나은행 (KEBHANA)

## 설치
```
$ npm install magicfx
```

## 사용방법

KEB하나은행의 환율 가져오기
```js
const magicfx = require('magicfx');
magicfx.parse('KEBHANA').then(
    (data) => { console.log(data) }, 
    (err) => { console.error(err) }
)
```

KEB하나은행의 환율 요청 시 반환값 예시
```
1128.90
```

비자카드의 일본 엔 환율 가져오기
```js
const magicfx = require('magicfx');
magicfx.parse('V', 'JPY').then(
    (data) => { console.log(data) }, 
    (err) => { console.error(err) }
)
```

비자카드의 일본 엔 환율 요청 시 반환값 예시
```
0.009934
```