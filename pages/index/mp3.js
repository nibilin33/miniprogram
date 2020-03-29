export default class Music {
    static audio = null
    static status = 'play'
    static init() {
        Music.audio = wx.createAudioContext('music');
        //document.getElementById("music");
    }
    static destroy() {
        Music.pause();
        Music.audio = null;
    }
    static pause() {
        Music.audio.pause();
        Music.audio.seek(0);
        Music.status = 'play';
        //Music.audio.load();
    }
    static play() {
        Music.audio.play();
        Music.audio.seek(20);
        Music.status = 'pause';
    }
}