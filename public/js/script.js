document.getElementById('addressInput').onsubmit = e => {
    e.preventDefault();

    const search = e.target[0].value;

    fetch('./weather?address=' + search).then(response => {
        response.json().then(data => {
            if (data.error) {
                document.getElementById('error').innerHTML = data.error;
                document.getElementById('error').style.display = 'block';
                document.getElementById('success').style.display = 'none';
            } else {
                document.getElementById('location').innerHTML = data.location;
                document.getElementById('weatherInfo').innerHTML = data.currentWeather;
                document.getElementById('success').style.display = 'block';
                document.getElementById('error').style.display = 'none';
            }            
        })
    })
};

