import { NextApiResponse, NextApiRequest } from 'next';


export default (request: NextApiRequest, response: NextApiResponse) => {
    console.log(request.query)
    
    const users = [
        { id: 1, name: 'Alef' },
        { id: 2, name: 'Samara' },
        { id: 3, name: 'Théo' },
    ];
    
    return response.json(users);
}