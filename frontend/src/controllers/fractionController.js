export default class FractionController {
    static async getFraction(endpoint, token) {
        return await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Aplication': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    return await response.json();
                } else {
                    throw new Error
                }
            })
            .catch(error => {
                throw error
            })

    }

    static async payFraction(endpoint, token) {
        return await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Aplication': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async response => {
                console.log(response);
                if (response.status === 200) {
                    return await response.json();
                } else {
                    throw new Error
                }
            })
            .catch(error => {
                console.log(error);
                throw error
            })
    }

    static async confirmFraction(endpoint, token) {
        return await fetch(endpoint, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Aplication': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async response => {
                if (response.status === 200) {
                    return await response.json();
                } else {
                    throw new Error
                }
            })
            .catch(error => {
                throw error
            })
    }
}
