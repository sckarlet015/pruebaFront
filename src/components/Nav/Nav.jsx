import React from "react";
import style from "./Nav.module.css"
import { NavLink } from "react-router-dom";

export default function Nav() {

    return (
        <div className={style.NavBar}>
            <NavLink to={"/agenda"} className={style.link}>
                <p className={style.tex}>AGENDA</p>
            </NavLink>
            <NavLink to={"/user"} className={style.link}>
                <p className={style.tex}>PERFIL</p>
            </NavLink>
            <NavLink to={"/create"} className={style.link}>
            <p className={style.tex}>NUEVO CONTACTO</p>
            </NavLink>
        </div>
    )
}