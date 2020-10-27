import React from "react";
import './Button.scss';

const Button = (props : any) => {
    return(
      <button className={props.className}>
          {props.children}
      </button>
    )
}

export default Button;