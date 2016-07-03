import $ from 'jquery';
import ID from './cred';

var base_url = 'https://api.soundcloud.com';

function getArtistTracks(artist){
    return $.ajax({
        url: base_url + '/tracks',
        data: {
            q: artist,
            client_id: ID
        }
    })
}

export {getArtistTracks as getTracks};
