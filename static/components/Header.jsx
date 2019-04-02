import React from 'react';
import { Link } from "react-router-dom";

const applinks = [
    {
        name: "Поиск победителей",
        linkTo: "search"
    },
    {
        name: "Информация по тендеру",
        linkTo: "information"
    },
    {
        name: "Калькулятор",
        linkTo: "calculator"
    },
];

function Header(props){
    return(
        <header className="header">
            <nav>
                <ul className="p-2 nav list-unstyled">
                    {
                        applinks.map((applink, key) =>
                            <li key = {key}
                                className="m-2 nav-item font-weight-bold">
                                <Link
                                    className={
                                        applink.linkTo === props.linkTo ? "nav-link active" : "nav-link"
                                    }
                                    to={"/" + applink.linkTo}>
                                        {applink.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Header;