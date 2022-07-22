import { RespositoryItem } from "./RepositoryItem";

const repository = {
    name: 'unform',
    description: 'Form in React',
    link: 'https://github.com/alefwhite'
}

export function RespositoryList () {
    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                <RespositoryItem 
                    repository={repository}
                  
                />   
            </ul>
        </section>
    )
}