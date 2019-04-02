import React from 'react';
import { Link } from "react-router-dom";

const DisplayWinners = ({status, clients}) => {
    if (status === "pending")
    {return <div className="col col-lg-5 col-sm-8 product">
        <div className="alert alert-warning" role="alert">
            Данные загружаются
        </div>
    </div>}

    else if (status === "ready")
    {return <div className="row">
        {
            clients.map(client =>
                (client.tenders.length !== 0)
                    ?
                    <div key={client.INN} className="card col-8 m-1 p-1">
                        <div className="card-body">
                            <h5 className="card-title">{client.name}</h5>
                            <h6 className="card-subtitle text-muted">ИНН {client.INN}</h6>
                            <table className="table table-sm table-striped">
                                <thead>
                                <tr>
                                    <th scope="col align-self-center">РНТ</th>
                                    <th scope="col align-self-center">БГ</th>
                                    <th scope="col align-self-center">НМЦ</th>
                                    <th scope="col align-self-center">Победитель</th>
                                </tr>
                                </thead>
                                <tbody>
                                {client.tenders.map((tender, key) =>
                                    (tender.numberT.length === 19)
                                        ?
                                        <tr key={key}>
                                            <td>
                                                <Link to={"/information/" +tender.numberT}
                                                      target="_blank">
                                                    {tender.numberT}<br/>
                                                </Link>
                                            </td>
                                            <td className="cell__style">{
                                                tender.assurance
                                                    ?
                                                    tender.assurance.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                                                    :
                                                    null
                                            }&nbsp;руб.</td>

                                            <td className="cell__style">{
                                                tender.maxCost
                                                    ?
                                                    tender.maxCost.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
                                                    :
                                                    null
                                            }&nbsp;руб.</td>

                                            <td>{tender.winnerName ? tender.winnerName : (tender.winnerNameRow1 + tender.winnerNameRow2)}</td>
                                        </tr>
                                        :
                                        <tr key={key}>
                                            <td>
                                                <a href= {tender.href} target="_blank">{tender.numberT}<br/></a>
                                            </td>
                                        </tr>
                                )}
                                </tbody>
                            </table>

                        </div>
                    </div>
                    :
                    null
            )
        }
    </div>}
    else if (status === "error")
    {return <div className="col col-lg-5 col-sm-8 product">
        <div className="alert alert-danger" role="alert">
            Загрузка базы завершилась ошибкой
        </div>
    </div>}

    else {return false;}
};

export default DisplayWinners;