const formattingData = (data) => {

    if (data.winnerOffer) {
        data.winnerOffer = data.winnerOffer.replace('Российский рубль', '');
        data.winnerOffer = data.winnerOffer.replace(/\s/g, '');
        data.winnerOffer = data.winnerOffer.replace(',', '.');
    }
    if (data.winnerOfferRow1) {
        data.winnerOfferRow1 = data.winnerOfferRow1.replace('Российский рубль', '');
        data.winnerOfferRow1 = data.winnerOfferRow1.replace(/\s/g, '');
        data.winnerOfferRow1 = data.winnerOfferRow1.replace(',', '.');
    }

    if (data.winnerOfferRow2) {
        data.winnerOfferRow2 = data.winnerOfferRow2.replace('Российский рубль', '');
        data.winnerOfferRow2 = data.winnerOfferRow2.replace(/\s/g, '');
        data.winnerOfferRow2 = data.winnerOfferRow2.replace(',', '.');
    }

    if (data.maxCost) {
        data.maxCost = data.maxCost.replace('Российский рубль', '');
        data.maxCost = data.maxCost.replace(/\s/g, '');
        data.maxCost = data.maxCost.replace(',', '.');
        data.assurance = data.assurance.replace('Российский рубль', '');
        data.assurance = data.assurance.replace(/\s/g, '');
        data.assurance = data.assurance.replace(',', '.');
    }

    if (data.winnerName) {
        data.winnerName = data.winnerName.replace('Общество с ограниченной ответственностью', 'ООО');
        data.winnerName = data.winnerName.replace('ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ', 'ООО');
        data.winnerName = data.winnerName.replace('Индивидуальный предприниматель', 'ИП');
        data.winnerName = data.winnerName.replace('ОТКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО', 'ОАО');

    }

    if (data.winnerNameRow1) {
        data.winnerNameRow1 = data.winnerNameRow1.replace('Общество с ограниченной ответственностью', 'ООО');
        data.winnerNameRow1 = data.winnerNameRow1.replace('ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ', 'ООО');
        data.winnerNameRow1 = data.winnerNameRow1.replace('Индивидуальный предприниматель', 'ИП');
        data.winnerNameRow1 = data.winnerNameRow1.replace('ОТКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО', 'ОАО');
    }

    if (data.winnerNameRow2) {
        data.winnerNameRow2 = data.winnerNameRow2.replace('Общество с ограниченной ответственностью', 'ООО');
        data.winnerNameRow2 = data.winnerNameRow2.replace('ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ', 'ООО');
        data.winnerNameRow2 = data.winnerNameRow2.replace('Индивидуальный предприниматель', 'ИП');
        data.winnerNameRow2 = data.winnerNameRow2.replace('ОТКРЫТОЕ АКЦИОНЕРНОЕ ОБЩЕСТВО', 'ОАО');
    }

    return data;
};

module.exports = formattingData;