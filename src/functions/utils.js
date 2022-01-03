const utils = {
    currentInterval: "",
    autoFetch: false,
    stopInterval: function() {
        clearInterval(utils.currentInterval);
        utils.autoFetch = false;
    },
    mapInstance: null,
    createFlashMessage: function(data, context) {
        const texts = {
            endMaintenance: {
                success: "Underhåll avslutat",
                error: "Något gick snett",
            },
            move: {
                success: "Cykel flyttad till station",
                error: "Något gick snett",
            },
            moveMaintenance: {
                success: "Cykel flyttad, underhåll påbörjat",
                error: "Något gick snett",
            },
            getDataButton: {
                success: "Senaste data hämtad",
                error: "Något gick snett",
            },
            updateUser: {
                success: "Kundinformation uppdaterad",
                error: "Kundinformation ej uppdaterad",
            },
            updatePrice: {
                success: "Pristariff uppdaterad",
                error: "Pristariff ej uppdaterad",
            },
        };

        const isError = Object.prototype.hasOwnProperty.call(data, "error");
        const type = (isError ? "error" : "success");
        const text = texts[context][type];
        const message = { text: text, error: isError };

        return message;
    }
};

export default utils;
