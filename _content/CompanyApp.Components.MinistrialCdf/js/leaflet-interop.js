window.leafletMap = {
    map: null,
    projectMarkers: [],
    contractorMarkers: [],

    initMap: function (mapElementId, lat, lng, zoom) {
        if (this.map !== null) {
            this.map.remove();
        }
        this.map = L.map(mapElementId).setView([lat, lng], zoom);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    },

    clearMarkers: function () {
        this.projectMarkers.forEach(marker => marker.remove());
        this.contractorMarkers.forEach(marker => marker.remove());
        this.projectMarkers = [];
        this.contractorMarkers = [];
    },

    addProjectMarker: function (projectId, lat, lng, projectName, status) {
        var marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(`<b>${projectName}</b><br>Status: ${status}<br>Project ID: ${projectId}`);
        this.projectMarkers.push(marker);
    },

    addContractorMarker: function (contractorId, lat, lng, companyName) {
        var marker = L.marker([lat, lng], { icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        })}).addTo(this.map);
        marker.bindPopup(`<b>${companyName}</b><br>Contractor ID: ${contractorId}`);
        this.contractorMarkers.push(marker);
    },

    dispose: function () {
        if (this.map !== null) {
            this.map.remove();
            this.map = null;
        }
    }
};