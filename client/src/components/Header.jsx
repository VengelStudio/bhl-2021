import React from 'react'
import { Divider } from "@material-ui/core";


export default function Header({children, divider, hint}) {
    return (
      <div className="header">
        <h3 className="header__title">{children}</h3>
        {hint ? <p className="header__hint">{hint}</p> : ""}
        {divider ? <Divider style={{marginTop: '10px'}} /> : ""}
      </div>
    );
}
