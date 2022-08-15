import { useState } from "react"

export function RespositoryItem (props) {
    return (
        <li>
            <strong>{props.repository?.name ?? 'Default'}</strong>

            <p>{props.repository.description}</p>

            <a href={props.repository.html_url}>Acessa repositório</a>
        </li>                
   
    )
}