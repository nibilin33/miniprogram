export default class Music {
    static audio = null
    static status = 'play'
    static count = 0
    static init() {
        Music.audio = wx.createAudioContext('music');
        //document.getElementById("music");
    }
    static destroy() {
        Music.pause();
        Music.audio = null;
    }
    static loop() {
        Music.count++;
        let src = Music.count%2+1;
        console.log('loop');
        Music.audio.setSrc(`./video/mp3cut${src}.mp3`);
        Music.audio.seek(0);
        Music.audio.play();
    }
    static pause() {
        Music.audio.pause();
        Music.audio.seek(0);
        Music.status = 'play';
        //Music.audio.load();
    }
    static play() {
        Music.audio.play();
        Music.status = 'pause';
    }
}