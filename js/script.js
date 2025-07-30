function handleIPResponse(data) {
    // Hide loading location text
    document.getElementById("load-location").style = 'display: none;';

    let pageTitle = document.getElementById("title");
    pageTitle.textContent = "Zpd8x | "+ data.ip;
    // Elements for location info
    let location = document.getElementById("location");
    let country = document.createElement("span");
    let region = document.createElement("span");
    let city = document.createElement("span"); 

    // Section for VPN/TOR status message
    const notationgSection = document.querySelector("#notationg");

    // Reference to IP display element
    const ipElement = document.querySelector("#ip");

    // If request failed
    if (!data.success) {
        ipElement.textContent = "Unable to retrieve IP";
        document.getElementById("isp").textContent = "Unknown";

        country.textContent = "Unknown";
        region.textContent = "-";
        city.textContent = "-";

        location.appendChild(country);
        location.appendChild(region);
        location.appendChild(city);
        return;
    }

    // Display IP
    ipElement.textContent = data.ip;

    // Get coordinates
    const lat = data.latitude;
    const lon = data.longitude;

    // Make IP element clickable to open Google Maps
    ipElement.style.cursor = "pointer";
    ipElement.title = "Click to view your location on Google Maps";
    ipElement.addEventListener("click", function () {
        window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
    });

    // Show flag
    document.getElementById("flg-img").innerHTML =
        `<img src="${data.flag.img}" alt="${data.country} flag" title="${data.country}" width="25">`;

    // Show location details
    country.textContent = data.country + ', ';
    region.textContent = data.region + ', ';
    city.textContent = data.city;

    location.appendChild(country);
    location.appendChild(region);
    location.appendChild(city);

    // Show ISP
    document.getElementById("isp").textContent = data.connection?.isp || data.org || "Unknown";

    // Show VPN/TOR warning or safe message
    if (data.security?.vpn === true || data.security?.tor === true) {
        notationgSection.innerHTML =
            `<div class="safe-section">
                <h3>
                    <i class="fa-solid fa-shield-halved"></i>
                    You are safe
                </h3>
                <p>When your connection is secure, your online activity is encrypted, making it inaccessible to your internet service provider or any potential eavesdroppers. This ensures a private and protected browsing experience.</p>
            </div>`;
    } else {
        notationgSection.innerHTML =
            `<div class="warning-section">
                <h3>
                    <i class="fa-solid fa-triangle-exclamation"></i>
                    Warning
                </h3>
                <p>Your online activity can be seen by your internet service provider and anyone else spying on your connection.</p>
            </div>`;
    }
}

// Load IPWho API via JSONP
const script = document.createElement('script');
script.src = 'https://ipwho.is/?callback=handleIPResponse';
document.head.appendChild(script);
