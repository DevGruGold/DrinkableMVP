// Initialize map
let map, heatmapLayer;

function initMap() {
    // Create map
    map = L.map('map', {
        center: CONFIG.MAP.CENTER,
        zoom: CONFIG.MAP.ZOOM,
        maxZoom: CONFIG.MAP.MAX_ZOOM,
        minZoom: CONFIG.MAP.MIN_ZOOM
    });

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Initialize heatmap
    heatmapLayer = new HeatmapOverlay(CONFIG.HEATMAP);
    map.addLayer(heatmapLayer);
}

function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

async function fetchWaterQualityData() {
    showLoading();
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEETS_API.SPREADSHEET_ID}/values/Sheet1`
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const heatmapData = processData(data.values);
        updateMap(heatmapData);
        updateLastUpdated();
        hideLoading();
    } catch (error) {
        console.error('Error fetching data:', error);
        hideLoading();
        alert('Error loading water quality data. Please try again later.');
    }
}

function processData(rows) {
    // Skip header row
    const dataPoints = rows.slice(1).map(row => ({
        lat: parseFloat(row[1]),
        lng: parseFloat(row[2]),
        waterQuality: parseFloat(row[3])
    }));

    return {
        max: 100,
        min: 0,
        data: dataPoints
    };
}

function updateMap(data) {
    heatmapLayer.setData(data);
}

function updateLastUpdated() {
    const now = new Date();
    document.getElementById('lastUpdate').textContent = now.toLocaleString();
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                map.setView([position.coords.latitude, position.coords.longitude], 12);
            },
            error => {
                console.warn('Error getting user location:', error);
            }
        );
    }
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    fetchWaterQualityData();
    getUserLocation();
    
    // Set up periodic refresh
    setInterval(fetchWaterQualityData, CONFIG.SHEETS_API.REFRESH_INTERVAL);
});