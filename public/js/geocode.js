geocoder = {};
gh_token = 'f0697fa6-6b37-4a82-81b0-6dbf9170892c'; /*Plz dont kill me*/ 

geocoder.geo = {
    /** 
     * @param {string} key: GraphHopper API key
    */
    init: function (key) {
        this.token = key;
        console.log(this);
    },

    /** 
     * @param {string} loc: The name of the location to search in the database
     * @param {number} lim: (Optional) The maximum amount of results, defaults to 20
    */
    buildApiUrl: function(loc, lim) {
        var url = `https://graphhopper.com/api/1/geocode?q=${loc}&limit=${lim||20}&key=${this.token}`;
        return url;
    },

    /** 
     * @param {string} loc: The name of the location to search in the database
    */
    getResults: function(loc) {
        var url = this.buildApiUrl(loc);
        
    }
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
    geocoder.geo.init(gh_token);
    $('#search_input').on('keyup', checkResize);
});