import { RespositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss';
import { useState, useEffect } from "react";

// https://api.github.com/orgs/rocketseat/repos

const repository = {
    name: 'unform',
    description: 'Form in React',
    link: 'https://github.com/alefwhite'
}

export function RespositoryList () {
    const [repositories, setRepositories] = useState([])
    

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos')
            .then(response => response.json())
            .then(data => setRepositories(data))
    }, [])

    return (
        <section className="repository-list">
            <h1>Lista de repositórios</h1>
            <ul>
                {
                    repositories.map((repository) => (
                        <RespositoryItem 
                            key={repository.name}
                            repository={repository}                  
                        />   
                    )) 
                }
               
            </ul>
        </section>
    )
}