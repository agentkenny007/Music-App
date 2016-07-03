import $ from 'jquery';
import {getTracks} from './soundcloud';
import ID from './cred';

var fetchTimeout, date = new Date(),
    rInfo = $(`
        <li>
            <div class="card">
                <div><img><span class="play"></span></div>
                <marquee class="title"></marquee>
                <span class="username"></span>
            </div>
        </li>`);

var animateHeader = function(){
    var screen = $(this), wrapper = $('.container');
    if (screen.scrollTop() > 1 && wrapper.hasClass('scrolled') == false)
        wrapper.addClass('scrolled');
    else if (screen.scrollTop() < 1 && wrapper.hasClass('scrolled'))
        wrapper.removeClass('scrolled');
};

var displayTrackInfo = function(){
    var input = $(this);
    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(function(){
        fetchTimeout = null;
        getTracks(input.val()).then(function(data){
            var results = $('.tracks ul');
            results.html('');
            console.log(data);
            data.forEach(function(result){
                results.append(rInfo.clone()
                    .find('img')
                        .attr("src", result.artwork_url || result.user.avatar_url)
                    .end().find('.play')
                        .attr("data-url", result.stream_url)
                        .attr("data-link", result.permalink_url)
                    .end().find('.title')
                        .attr("title", result.title)
                        .html(result.title)
                    .end().find('.username')
                        .html(`<a href="${result.user.permalink_url}" target="_blank" title="${result.user.username}">${result.user.username}</a>`)
                    .end()
                );
            });
        });
    }, 500);
};

var playTrack = function(){
    var track = $(this);
    $('.player')
        .attr("src", `${track.data('url')}?client_id=${ID}`);
    $('.info a')
        .attr("href", track.data('link'))
        .text(track.parent().siblings('.title').text());
    $('audio')[0]
        .play();
};

var run = function(){
    displayTrackInfo();
    $('.footer').append(`&copy; ${date.getFullYear()} MusApp. All Rights Reserved.`);
};

$(window).scroll(animateHeader);

$(document)
    .delegate('.search-field', 'keyup', displayTrackInfo)
    .delegate('.tracks .play', 'click', playTrack)
    .delegate('form', 'submit', function(){ return false; })
    .ready(run);
