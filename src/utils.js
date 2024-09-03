async function fetchAndJSON(url, payload) {
    let body = await fetch(url, {
        headers: {"ngrok-skip-browser-warning": "inferno"},
    })
    if (body.status !== 200) {
        console.log("erro")
    }

    return await body.json();
}


export {fetchAndJSON}