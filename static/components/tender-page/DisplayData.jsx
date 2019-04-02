import React from 'react';
import { Link } from "react-router-dom";
// import SubItem from './SubItem';
import Button from '../Button.jsx';

function DisplayData({status, tender}){
    if (status === "idle") {
        return (<div className="row">
            <h4 className="rounded d-inline-flex text-white">Введите реестровый номер торгов</h4>
        </div>)
    }

    else if (status === "pending") {
        return(
        <div className="row rounded alert alert-warning d-inline-flex" role="alert">
            Данные загружаются ...
        </div>);
    }
    else if (status === "ready") {
        return(
            <div className="row ml-2">
                <div className="Action col-3 m-1 pt-2 bg-light rounded">
                    <h4>Информация по аукциону</h4>

                    {/*</div>*/}

                    {/*<div className="Action col-lg-3 m-1 bg-light rounded">*/}
                    {/*<h4>Заказчик</h4>*/}
                    <span className="text-muted">Победитель</span>
                    <p>{tender.winnerName}</p>

                    <span className="text-muted">Осуществляет размещение</span>
                    <p>{tender.publisher}</p>

                    <span className="text-muted">Заказчик</span>
                    <p>{tender.customer}</p>

                    {/*<span className="text-muted">Адрес</span>*/}
                    {/*<p>Российская Федерация, 346744, Ростовская обл, Азовский р-н, Кулешовка с, УЛ ПРОЛЕТАРСКАЯ, 35 А</p>*/}

                    {/*<span className="text-muted">ИНН Заказчика</span>*/}
                    {/*<p>6101021760</p>*/}

                    {/*<span className="text-muted">КПП</span>*/}
                    {/*<p>610101001</p>*/}

                    <span className="text-muted">Способ определения поставщика</span>
                    <p>{tender.typeOfTender}</p>

                    <span className="text-muted">Наименование электронной площадки</span>
                    <p>{tender.platform}</p>

                    <span className="text-muted">Предмет контракта</span>
                    <p>{tender.subjectOfContract}</p>

                    <span className="text-muted">Номер лота</span>
                    <p>{tender.lotOfTender}</p>

                    <span className="text-muted">Идентификационный код закупки</span>
                    <p>{tender.purchaseIdentificationCode}</p>

                </div>

                <div className="Action col-3 m-1 pt-2 bg-light rounded">
                    <h4>Информация по заявке</h4>

                    <span className="text-muted">Сумма банковской гарантии</span>
                    <p>{tender.assurance ?
                        (tender.assurance.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace('.', ',')
                        :
                        null}
                        &nbsp;Российский рубль
                        <Button className="btn btn-outline-info font-weight-bold" type="submit">
                            <Link to={"/calculator/" +tender.assurance} target="_blank">Посчитать комиссию<br/></Link>
                        </Button>
                    </p>


                    <span className="text-muted">Начальная максимальная цена</span>
                    <p>{tender.maxCost ?
                        (tender.maxCost.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace('.', ',')
                        :
                        ''}
                        &nbsp;Российский рубль
                    </p>

                    <span className="text-muted">Стоимость контракта</span>
                    <p>{tender.winnerOffer ?
                        (tender.winnerOffer.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')).replace('.', ',')
                        :
                        ''}
                        &nbsp;Российский рубль
                    </p>

                    <span className="text-muted">Снижение</span>
                    <p>{tender.dropPercent ?
                        tender.dropPercent.replace('.', ',')
                        :
                        ''} %
                    </p>

                    <span className="text-muted">Протокол итогов</span>
                    <p>{tender.reportOfResult}</p>

                    <span className="text-muted">Дата публикации протокола итогов</span>
                    <p>{tender.dateOfPosting}</p>

                    {/*<div className="dropdown">*/}
                    {/*<button className="btn btn-secondary dropdown-toggle" type="button"  id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">*/}
                    {/*Документы тендера*/}
                    {/*</button>*/}

                    {/*<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">*/}
                    {/*{state.tender.titleOfDocs.map((title,index) =>*/}
                    {/*<a key={index} className="dropdown-item"  href={state.tender.hrefOfDocs[index]}>*/}
                    {/*{title}</a>)}*/}
                    {/*</div>*/}
                    {/*</div>*/}
                    <ul className="documents list-unstyled">
                        <h5> Документы тендера</h5>

                        {tender.titleOfDocs ?
                            tender.titleOfDocs.map((title, index) =>
                            <li><a key={index} href={tender.hrefOfDocs[index]}> {title} </a></li>)
                            :
                            <div></div>
                        }

                    </ul>
                </div>

                <div className="Action col-3 m-1 pt-2 bg-light rounded">
                    <h4>Результаты тендера</h4>

                    {tender.winnerName
                        ? <div>
                            <span className="text-muted">Победитель</span>
                            <p>{tender.winnerName}</p>

                        </div>
                        : <div>
                            <span className="text-muted">Таблица итогов строка 1</span>
                            <p>{tender.winnerNameRow1}</p>

                            <span className="text-muted">Предложенная цена</span>
                            <p>{tender.winnerOfferRow1}</p>

                            <span className="text-muted">Таблица итогов строка 2</span>
                            <p>{tender.winnerNameRow2}</p>

                            <span className="text-muted">Предложенная цена</span>
                            <p>{tender.winnerOfferRow2}</p>
                        </div>
                    }
                    <span className="text-muted">Протокол итогов</span>
                    <p>{tender.reportOfResult}</p>

                </div>

            </div>

        )}
    else {return (
        <div className="alert alert-danger" role="alert">
            Загрузка данных завершилась ошибкой
        </div>
    );}
}

export default DisplayData;