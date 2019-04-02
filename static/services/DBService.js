const osmosis = require('osmosis');
let tress = require('tress');
let log = require('cllc')();

const clients = require('./clientsDB');
const parsing = require('./parsing');


module.exports = {
    init() {
    },

    getInfoByRNT(RNT) {

        return new Promise((resolve,reject) => {
            let results = [];

            parsing.getGeneralInfo(RNT)
                .then(data1 => {
                    results = {...results,...data1};
                    parsing.getDocsHref(RNT)
                        .then(data2 => {
                            results = {...results,...data2};
                            parsing.getSupplierResults(RNT)
                                .then(data3 =>{
                                    results = {...results,...data3};

                                    if (results.winnerOffer) {
                                        let dropPercent = ((1-(+results.winnerOffer) / (+results.maxCost)) * 100).toFixed(2);
                                        results = {...results, ...{dropPercent}};
                                    }
                                    resolve({...results,...data3});
                                })
                                .catch(() => reject({...results}))
                        })
                        .catch(() => reject({...results}));
                })
                .catch(() => reject({...results}));
        });
    },

    getWinners(dateFrom, dateTo) {
        let URL = {
            beforeINN: "http://www.zakupki.gov.ru/epz/order/extendedsearch/results.html?morphology=on&pageNumber=1&sortDirection=false&recordsPerPage=_50&showLotsInfoHidden=false&fz44=on&fz223=on&af=true&ca=true&pc=true&pa=true&currencyIdGeneral=-1&participantName=",
            dateFrom: "&updateDateFrom=",
            dateTo: "&updateDateTo=",
            other: "&regionDeleted=false&sortBy=UPDATE_DATE&openMode=USE_DEFAULT_PARAMS"
        };

        return new Promise((resolve, reject) => {

        let results = [];

            const getListOfTenders = (client, callback) => {
                let clientData =[];

                osmosis
                    .get(URL.beforeINN + client.INN + URL.dateFrom + dateFrom + URL.dateTo + dateTo+URL.other)
                    .set([
                        osmosis
                            .find('td.tenderTd + td.descriptTenderTd')
                            .set({
                                numberT: 'a',
                                href: '@href'
                            })
                    ])
                    .data(async (items) => {
                        await items.reduce(async(lastPromise, current) =>{
                            let { numberT, href } = current;
                            numberT = numberT.replace('№ ', '');

                            if (numberT.length > 17) {
                                await lastPromise;
                                let tenderResult = [],
                                    tenderGeneral = [];
                                try {
                                    tenderResult = await parsing.getSupplierResults(numberT);
                                }
                                catch(err){
                                    console.log(`Ошибка в результатах тендера${err}`);
                                }

                                try{
                                    tenderGeneral = await parsing.getGeneralInfo(numberT);
                                }
                                catch(err){
                                    console.log(`Ошибка на титульной странице${err}`);
                                }

                                clientData.push({ ...tenderResult, ...tenderGeneral, ...{numberT, href}});
                            }

                            else
                                clientData.push({ numberT, href});

                        }, Promise.resolve());

                        log.step(0, 1);

                        results.push({...client, ...{tenders: clientData}});
                        callback();
                    })
                    .error((err) =>{
                        console.log( 'general', client.name, err);
                        log.step(0,0,1);

                    });
            };

        log('Начало работы');

        let q = tress(getListOfTenders, 1);

        q.drain = () => {
            log.finish();
            log('Работа закончена');
            resolve(results);
        };



        log.start('Клиенты %s, Количество тендеров %s, ошибки %s');

        g = clients.map(client => {
            q.push(client);
            log.step();
        });
        });
    }
};