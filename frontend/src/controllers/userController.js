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
}