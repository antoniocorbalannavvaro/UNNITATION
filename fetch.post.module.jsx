const sendData = (path, data) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    }

    fetch(`${path}`, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err))
    }

export default sendData;