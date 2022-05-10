export default class UserController {
    static async getByUsernameLike(endpoint, token, username) {
        return await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                "user": {
                    "username": username
                }
            })
        })
            .then(res => {
                return res
            })
    }

    static async getUser(endpoint, token) {
        return await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + token,
            }
        })
            .then(async user => {
                return await user.json()
            })
    }

    static async updateUser(endpoint, token, user) {
        return await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                "user": user
            })
        })
            .then(async user => {
                return await user.json()
            })
    }
}