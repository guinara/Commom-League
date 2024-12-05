import React from "react";
import * as Components from '../Widget/component'
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
    let data;
    switch (type) {
        case "team":
            data = {
                title: "Times",
                counter: 2,
                link: "Todos os Times",
                icon: "<PersonOutlinedIcon/>",
            };
            break;
            case "chanpionship":
                data = {
                    title: "planos",
                    counter: 33,
                    link: "todos os capeonatos",
                    icon: "<InvetoryOutlinedIcon/>",
                    
                }
            default:
                data = {
                    title: "Default",
                    counter: 0,
                    link: "See Default",
                    icon: null,
                }
                break;
    }
    return (
        <Components.widgets>
            <Components.leftRight>
                <Components.title>{data.title}</Components.title>
                <Components.counter>{data.counter}</Components.counter>
                
            </Components.leftRight>
            <Components.leftRight>
                {data.icon}
            </Components.leftRight>
        </Components.widgets>
    )
}


export default Widget;