class Update {
  constructor() {

  }

  initPage() {
    $.get("api/playlist", function (playlists) {

      init(playlists.data);
      // var playlist = new Playlist(playlists);
      // playlist.build();
      // playlist.registerPlaying();
    });
  }
}