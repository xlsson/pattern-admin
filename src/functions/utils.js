const utils = {
    currentInterval: "",
    autoFetch: false,
    stopInterval: function() {
        clearInterval(utils.currentInterval);
        utils.autoFetch = false;
        console.log(utils.autoFetch, utils.currentInterval);
    }
};

export default utils;
