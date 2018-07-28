const Request = require(`${__app}/models/Request`);

module.exports = (request, response) => {
    const IO = new Request({
        created: new Date(),
        ip: request.ip.split(':')[3], // No IPv4 subnet prefix
        method: request.method,
        url: request.url,
        protocol: request.protocol,
        request: {
            params: request.params,
            query: request.query,
            body: request.body,
        },
        response: {
            body: response.body,
        },
    });

    return IO.save()
}
