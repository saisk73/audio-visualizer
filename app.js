const player = document.getElementById("player");
const container = document.getElementById("app-progress")
function playPause() {
    if (player.paused) {
        player.play();
        hideShowIcons("pause")
    } else {
        player.pause();
        hideShowIcons("play")
    }
}

/*
    HELPERS
*/

/*
 reference = https://stackoverflow.com/questions/4993097/html5-display-audio-currenttime
*/
function format_time(audio_duration){
    sec = Math.floor( audio_duration );
    min = Math.floor( sec / 60 );
    min = min >= 10 ? min : '0' + min;
    sec = Math.floor( sec % 60 );
    sec = sec >= 10 ? sec : '0' + sec;
    return min + ":"+ sec;
}

function getCurrentTime () {
    $("#current_time").html(format_time(player.currentTime));
    $("#total_time").html(format_time(player.duration));
    const percent  = (player.currentTime*100)/player.duration;
    for(let i = 1; i<= 100; i++) {
        console.log(i, Math.round(percent))
        if(i <= Math.round(percent)) {
            $(`#line-${Math.round(i)}`).addClass("app__progress__line__active");
        } else {
            $(`#line-${Math.round(i)}`).removeClass("app__progress__line__active");
        }
    }
    if(player.currentTime == player.duration) {
        hideShowIcons("replay")
    }
}

function getRandomNumber () {
    const minHeight = 20;
    const maxHeight = 80;
    const direction = Math.random() < 0.5 ? 0 : 1
    return [(Math.random() * (maxHeight - minHeight) + minHeight), direction];
}

function hideShowIcons (e) {
    const icons = [{
        action: "pause",
        class: "app-icons-pause"
    }, {
        action: "play",
        class: "app-icons-play"
    }, {
        action: "replay",
        class: "app-icons-replay"
    }]
    icons.map((icon,key)=> {
        if(icon.action === e) {
            document.getElementById(icon.class).style.display = 'inline-block';
        } else {
            document.getElementById(icon.class).style.display = 'none';
        }
    })
}

// event listener
player.addEventListener('timeupdate', function () {
    getCurrentTime();
});


// mounted
$( document ).ready(function() {
    for(let i = 0; i< 100; i++) {
        const data = getRandomNumber();
        $("#app-progress").append(`
            <div 
                class="app__progress__line" 
                id="line-${i+1}"
                aria-describedby="tooltip"
                style="height: ${data[0]}px; margin-top: ${data[1] === 0 ? '-' +data[0]+ 'px !important' : '0px' } ;}"
            >
                ${i+1 === 14 ? `<span class="app__progress__line__tooltip">Introduction</span>` : ''}
                ${i+1 === 34 ? `<span class="app__progress__line__tooltip">Label 2</span>` : ''}
                ${i+1 === 67 ? `<span class="app__progress__line__tooltip">Label 2</span>` : ''}
                ${i+1 === 89 ? `<span class="app__progress__line__tooltip">End</span>` : ''}
            </div>
        `)
        console.log(data[0], data[1])
    }
    getCurrentTime();
    // onclick line
    $('.app__progress__line').click( function() {
        const selectedLine = $(this)[0];
        const selectedLineId = selectedLine.getAttribute("id");
        const key = selectedLineId.split("-")[1];
        const totalTimePercent = player.duration / 100;
        const currentTimeToPlay = totalTimePercent * key;
        player.currentTime = currentTimeToPlay;
    })
})