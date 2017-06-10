$(document).ready(function () {

    $("#commentForm").validate();

    $('.our_blog__images__item__image').on('click', function(){
        $('.our_blog__images__popup').removeClass('is-hidden');

    });

    $('.our_blog__images__popup').on('click', function(){
        $(this).addClass('is-hidden');
    });

    $('.recent-works__tags').on('click', '.recent-works__tags__item', function(){
        
        var filterType = '.recent-works-' + $(this).data('filter'),
            elem = $('.recent-works__images__item');
            console.log(filterType);
            console.log(elem);

            if($(this).data('filter') == 'all') {

                elem.toggleClass('is-active');
            } else {

            elem.removeClass('is-active').addClass('is-blurred');
            elem.filter(filterType).toggleClass('is-active');
            }
            
    });

});

