const osmosis = require('osmosis');

const formattingData = require('./formattingData');

const URL = "http://zakupki.gov.ru/epz/order/notice/ea44/view/common-info.html?regNumber=";

const getSupplierResults = (RNT) => {
    return new Promise((resolve,reject) => {
        let result = [];

        osmosis
            .get(URL+RNT)
            .find('td[tab="SUPPLIER_RESULTS"]')
            .follow('@url')
            .find(
                'h2:contains("Результат определения поставщика, сформированный на основании размещенных") + ' +
                'div div table'
            )
            .set({
                lotOfTender: 'tr[2] td',
                reportOfResult: 'tr[3] td[1]',
                dateOfPosting: 'tr[3] td[5]',
                customer: 'tr[3] td[2]',
                winnerName: 'td:contains("Победитель")',
                winnerOffer: 'td:contains("Победитель") +',
                winnerNameRow1: 'tr[3] td[3]',
                winnerOfferRow1: 'tr[3] td[4]',
                winnerNameRow2: 'tr[4] td[1]',
                winnerOfferRow2: 'tr[4] td[2]'
            })
            .data(item => {
                result = formattingData({...result, ...item});
            })
            .done(() => {
                resolve(result);
            })
            .error((err) => {
                console.log('getSupplierResults Error', RNT, err);
                reject(result);
            })
    })
};

const getDocsHref = (RNT) => {
    return new Promise((resolve,reject) => {
        let result = [];

        osmosis
            .get(URL+RNT)
            .find('td[tab="DOCS"]')
            .follow('@url')
            .find('h2:contains("документации") + div')
            .set({
                titleOfDocs: ['div.displayTable a@title'],
                hrefOfDocs: ['div.displayTable a@href']
            })
            .find('a:contains("о проведении")')
            .follow('@href')
            .find('tr:contains("Идентификационный код закупки")')
            .set({
                purchaseIdentificationCode: 'td[2]'
            })
            .data(item => result = {...result, ...item})
            .done(() => resolve(result))
            .error((err) => {
                console.log('getDocsHref Error', RNT, err);
                reject(result);
            })
    })
};

const getGeneralInfo = (RNT) => {
    return new Promise((resolve,reject) => {
        let result =[];

        osmosis
            .get(URL+RNT)
            .find('h2:contains("Общая информация о закупке")+ div table tbody')
            .set({
                typeOfTender: 'tr[1] td[2]',
                platform: 'tr[2] td[2]',
                publisher: 'tr[4] td[2]',
                subjectOfContract: 'tr[5] td[2]'
            })
            .find('h2:contains("Начальная (максимальная) цена контракта") + div tr:contains("Начальная (максимальная) цена контракта")')
            .set({
                maxCost: 'td[2]'
            })
            .find('tr:contains("Размер обеспечения исполнения контракта"):first')
            .set({
                assurance: 'td[2]'
            })
            .data(item => {
                result = formattingData({...result, ...item});
            })
            .done(() => resolve(result))
            .error((err) => {
                console.log('getGeneralInfo Error', RNT, err);
                reject(result);
            })
    })

};

module.exports = {getGeneralInfo, getDocsHref, getSupplierResults};