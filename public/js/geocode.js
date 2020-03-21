geocoder = {};
gh_token = 'f0697fa6-6b37-4a82-81b0-6dbf9170892c'; /*Plz dont kill me*/ 

geocoder.geo = {
    resCallback: null,
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
    getResults: function(loc, callback) {
        var url = this.buildApiUrl(loc);
        var timedOut = false;

        this.resCallback = callback;

        var tm = setTimeout(() => {
            timedOut = true;
        }, 20000);
        corslite(url, (err, res) => {
            if (!timedOut) {
				var fired = err ? err : res;
                var r = {
					status: fired.status,
					limit: Number(fired.getResponseHeader("X-RateLimit-Limit")),
					remaining: Number(fired.getResponseHeader("X-RateLimit-Remaining")),
					reset: Number(fired.getResponseHeader("X-RateLimit-Reset")),
					credits: Number(fired.getResponseHeader("X-RateLimit-Credits"))
                }
                console.log(`Limit: ${r.limit}\nRemaining: ${r.remaining}\nReset: ${r.reset}\nCredits: ${r.credits}`);
                if (!err) {
                    var data = JSON.parse(res.responseText);
                    this._resultsDone(data);
                }
            }
        }, true);
    },
    
    _resultsDone: function(data) {
        this.resCallback(data);
    }
}

const checkResize = () => {
    if ($('#search_input')[0].value !== '') {
        $('#search_bar').addClass('high');
        geocoder.geo.getResults($('#search_input')[0].value, (data) => {
            var e = $(".elementcontainer");
            var es = e[0];
            es.innerHTML = '';
            console.log(data);
            for (let i = 0; i < data.hits.length; i++) {
                let element = `<div class="place">
                    <span class="name">${data.hits[i].name},</span><br/>
                    <span class="zipcode">${data.hits[i].postcode ? data.hits[i].postcode + ',' : ''}</span>
                    <span class="state">${data.hits[i].state},</span>
                    <span class="country">${data.hits[i].country}</span>
                </div>`;
                es.innerHTML += element;
            }
        });
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