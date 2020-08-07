const express = require('express');
const port = 3000;
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});

app.post('/test', (request, response) => {
    let today = new Date();
    let date = today.getDate();

    function check_prime(n) {
        if (n === 1) {
            return false;
        } else if (n === 2) {
            return true;
        } else {
            for (var x = 2; x < n; x++) {
                if (n % x === 0) {
                    return false;
                }
            }
            return true;
        }
    }
    is_prime = check_prime(date)

    if (is_prime) {
        var request = require('request');
        var options = {
            'method': 'GET',
            'url': 'https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&\nexclude=hourly,daily&appid=67f210cc4151b70eb05ea9a53940a080',
            'headers': {}
        };
        request(options, function (error, resp) {
            if (error) throw new Error(error);
            var code = JSON.parse(resp.body).cod
            if (code == 401) {
                response.send('Date is prime but api.openweathermap.org has error');
            } else {
                response.send(resp.body);
            }
        });
    } else {
        response.send('Date is not prime so no date');
    }
});