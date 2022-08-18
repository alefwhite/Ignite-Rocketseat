interface RespositoryItemProps {
    repository: {
        name: string;
        description: string;
        html_url: string;
    }
}

export function RespositoryItem (props: RespositoryItemProps) {
    return (
        <li>
            <strong>{props.repository?.name ?? 'Default'}</strong>

            <p>{props.repository.description}</p>

            <a href={props.repository.html_url}>Acessa repositório</a>
        </li>                
   
    )
}