global const geocoder = geocoder || {};

geocoder.geo = {
    /** 
     * @param {string} loc: The name of the location to search in the database
     * @param {number} lim: (Optional) The maximum amount of results, defaults to 20
    */
    init: function (key) {
        this.token = key;
        console.log(this);
    },

    buildApiUrl: function(loc, lim) {
        var url = `https://graphhopper.com/api/1/geocode?q=${loc}&limit=${lim||20}&key=${this.token}`;
    },


}

const checkResize = () => {
    if ($('#search_input')[0].value !== '') {
        $('#search_bar').addClass('high');
        console.log(geocoder.geo.getResults($('#search_input')[0].value));
    } else {
        try {
            console.debug()
            $('#search_bar').removeClass('high');
        } catch (e) {}
    }
}

$(document).ready(() => {
    geocoder.geo.init();
    $('#search_input').on('keyup', checkResize);
});