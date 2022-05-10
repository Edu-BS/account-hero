export default class ExpenseController {
    static async getExpenses(route, token, groupId) {
        return await fetch(route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(async data => {
                expenses = await data.json();
                // return await data.json()
            })
    }

    static async getExpense(route, token) {
        return await fetch(route, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(async data => {
                console.log(data);
                const expense = await data.json();

                if (data.status !== 200)
                    throw new Error(expense.error);

                expense.date = new Date(expense.date)
                return expense
            })
            .catch(async err => {
                throw new Error(err.message)
            })

    }

}