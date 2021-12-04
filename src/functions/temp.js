
function backend(request, baseUrl, callback, params = {}) {
    let url = `${baseUrl}/graphql`;
    let requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': params.token
        }
    };

    if (request === "sendinvite") {
        url = `${baseUrl}/sendinvite`;
        requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': params.token
            },
            body: JSON.stringify({
            recipient: params.recipient,
            inviterName: params.inviterName,
            filename: params.filename,
            title: params.title
             })
        };
        sendRequest(url, callback, requestOptions);
        return;
    }

}

function sendRequest(url, callback, requestOptions) {
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(function(data) {
            return callback(data);
        });
}
