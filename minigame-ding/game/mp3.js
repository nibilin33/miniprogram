export default class Music {
    static audio = null
    static status = 'play'
    static count = 0
    static init() {
        Music.audio =  new Audio();
        Music.audio.onended = function() {
            Music.loop();
        };
    }
    static destroy() {
        Music.pause();
        Music.audio = null;
    }
    static loop() {
        Music.count++;
        let src = Music.count%2+1;
        Music.audio.src=`static/video/mp3cut${src}.mp3`;
        Music.audio.play();
    }
    static pause() {
        Music.audio.pause();
        Music.status = 'play';
    }
    static play() {
        Music.audio.play();
        Music.status = 'pause';
    }
}