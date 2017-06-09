$(document).ready(function () {

    $("#commentForm").validate();

    $('.our_blog__images__item__image').on('click', function(){
        $('.our_blog__images__popup').removeClass('is-hidden');

    });

    $('.our_blog__images__popup').on('click', function(){
        $(this).addClass('is-hidden');
    });

});

