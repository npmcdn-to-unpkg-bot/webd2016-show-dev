// "usse strict";

jQuery(document).ready(function($) {
    $('.countdown').downCount({
        date: '04/25/2016 17:00:00',
        offset: +10
    }, function() {
        alert('WOOT WOOT, done!');
    });
});
