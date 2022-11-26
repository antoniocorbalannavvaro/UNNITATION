'use client'

function getMeta() {
    
    return fetch('/api/get-meta-fields').then((res) => {
        return res.json()
    }).then((data) => {

        if (data.error) {
            return;
        }; 


        return data

    })

}

export default getMeta

