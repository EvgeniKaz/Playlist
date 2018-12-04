 fetch('api/playlist')
.then(response => response.json())
.then(playlists => {
	init(playlists.data)

	$('input[type=search]').keyup(function(event) {
		init(
			playlists.data.filter(pl => pl.name.toLowerCase().includes($(event.target).val().toLowerCase()))
		)
	});
})
function init(playlists) {
	$('main').empty()
	playlists.forEach(playlistObj => {
		var playlist = new Playlist(playlistObj);
		playlist.build();
		playlist.registerPlaying()
	})
}

$('#btn-add-playlist').click(function() {
	const addPlaylistPopup = new DynamicPopup('./html/addPlaylistForm.html');
	addPlaylistPopup.build()
	addPlaylistPopup.closeWithEsc();
})