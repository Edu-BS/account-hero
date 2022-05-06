export default class InvitationController {

    static async getInvitations(endpoint, username, token) {
        const res = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
        })
            .then(data => {
                console.log(data)
                return data
            })

        let invitations = await res.json()

        console.log(invitations);
        invitations = invitations.filter(invitation => username !== invitation.host.username)
        invitations = invitations.filter(invitation => invitation.accepted == false)
        return invitations
    }

    static async acceptInvitation(endpoint, token, invitationId) {
        const res = await fetch(endpoint, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify({
                invitationId: invitationId,
            })
        })
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => {
                console.error(error)
            })

        // const invitation = await res.json()

        return res
    }

    


}