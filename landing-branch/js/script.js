// "usse strict";

jQuery(document).ready(function($) {
    $('.countdown').downCount({
        date: '04/04/2016 10:00:00',
        offset: +10
    }, function() {
        alert('WOOT WOOT, we\'re launching!');
    });
});
