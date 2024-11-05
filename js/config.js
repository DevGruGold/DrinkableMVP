const CONFIG = {
    MAP: {
        CENTER: [9.7489, -83.7534], // Costa Rica center
        ZOOM: 7,
        MAX_ZOOM: 18,
        MIN_ZOOM: 5
    },
    HEATMAP: {
        radius: 0.05,
        maxOpacity: 0.8,
        scaleRadius: true,
        useLocalExtrema: true,
        latField: 'lat',
        lngField: 'lng',
        valueField: 'waterQuality'
    },
    SHEETS_API: {
        SPREADSHEET_ID: '1uAwcGhWHCit3GOcMcaEBzi2I5iKaC2UeYUtkE9lasDM',
        REFRESH_INTERVAL: 300000 // 5 minutes
    }
};