const checkResize = () => {
    if ($('#search_input')[0].value !== '') {
        $('#search_bar').addClass('high');
    } else {
        try {
            console.debug()
            $('#search_bar').removeClass('high');
        } catch (e) {}
    }
}

$(document).ready(() => { 
    $('#search_input').on('keyup', checkResize);
});