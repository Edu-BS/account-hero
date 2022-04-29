// import process from 'process';
// import dotenv from 'dotenv'
// const dotenv = require('dotenv')

// dotenv.config()

let endpoint = 'http://localhost:3001/api/group'

export default  class GroupController {

    static async createGroup  (token, { name, description, users }) {
        console.log(endpoint);
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                "name": name,
                "description": description,
                "users": users
            })
        })
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => {
                console.error(error)
            })
        return res
    }
        
}