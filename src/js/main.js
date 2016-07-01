import $ from 'jquery';
import {getTracks} from './soundcloud';
import ID from './cred';

var fetchTimeout,
    rInfo = $(`
        <li>
            <img>
            <span class="title"></span>
            <span class="username"></span>
        </li>`);

var displayTrackInfo = function(event){
    var input = $(this);
    if (fetchTimeout) clearTimeout(fetchTimeout);
    fetchTimeout = setTimeout(function(){
        fetchTimeout = null;
        getTracks(input.val()).then(function(data){
            var results = $('.tracks ul');
            data.forEach(function(result){
                results.append(rInfo.clone()
                    .find('img')
                        .attr("src", result.user.avatar_url)
                        .attr("data-stream", result.stream_url)
                    .end().find('.title')
                        .html(result.title)
                    .end().find('.username')
                        .html(result.user.username)
                    .end()
                );
            });
        });
    }, 500);
};

var playTrack = function(event){
    $('.player').attr("src", $(this).data('stream') + "?client_id=" + ID);
};

$(document)
    .delegate('.search-field', 'keyup', displayTrackInfo)
    .delegate('.tracks img', 'click', playTrack);
