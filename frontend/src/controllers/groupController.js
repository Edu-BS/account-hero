export default class GroupController {

    static async createGroup(endpoint, token, { name, description, users, isEtherGroup }) {
        console.log(isEtherGroup);
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
                "users": users,
                "isEtherGroup": isEtherGroup
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

    static async createEtherGroup(endpoint, token, { name, description, users }) {
        return await fetch(endpoint, {
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
            .then(async data => {
                return await data.json()
            })
            .catch(error => {
                return error.message
            })
    }

    static async getExpenses(endpoint, token, { idGroup }) {
        return await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
        })

    }
}