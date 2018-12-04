class Player {
	constructor (playlistId, playlistName, image) {
		this.playlistId = playlistId;
		this.playlistName = playlistName;
		this.image = image;
		this.getSongs();
	}

	getSongs() {
		$.get('api/playlist/' + this.playlistId + '/songs', function(response) {
			this.songs = response.data.songs;
			$('.container').remove();
			this.build();
		}.bind(this));
	}

	build () {
	const container = $('<div>', {class: 'container'})
	const playerCon1 = $('<div>', {class: "playerCon1"}).appendTo(container);
	const playerCon2 = $('<div>', {class: "playerCon2"}).appendTo(container)

		$('<img>', {
			class: 'player-image',
			src: this.image
		}).appendTo(playerCon1);

		$('<h2>', {
			text: this.playlistName,
			class: "player-title"
		}).appendTo(playerCon1);

		$('<h4>', {
			text: "Now Playing: " + this.songs[0].name, 
			class: "player-song-name"
		}).appendTo(playerCon2);
	
		const audioPlayer = $('<audio>', {
			autoplay: true,
			type: "audio/mpeg",
			controls: true,
			class: 'audio',
			src: this.songs[0].url, 
			'data-song_id': 0,
		}).appendTo(playerCon2).on('ended', this.playNext.bind(this));

		audioPlayer.on('play', this.animatePlay.bind(this));
		audioPlayer.on('pause', this.animatePause.bind(this));

		const songList = $('<ol>', {id: "song-list"}).appendTo(playerCon2);
	
		this.songs.forEach((song, index) => {
			$('<li>', {
				text: song.name, 
				class: "song-from-list",
				}
			).click(function(e) {
				$('.audio').attr({
					'src': song.url,
					'data-song_id': index
				});
				$('.song-from-list').css('color', 'black')
				e.target.style.color = 'red'
				$('.player-song-name').text("Now Playing: " + song.name);
			}).appendTo(songList);
		});

		$('<button>', {
			text: "❌",
			class: "close-btn",
			click: this.close.bind(this),
		}).appendTo(playerCon2);

		$('<button>', {
			class: 'edit-btn fas fa-edit',
			click: this.editSongsform.bind(this)
		}).appendTo(container)

		$('#player').append(container);
		songList.find('.song-from-list:first').css('color', 'red');
	}
	close() {
		$('.container').remove();
	}

	playNext(e) {
		var index = ++e.target.dataset.song_id;
		if (index >= this.songs.length) {return false;}
		$('.player-song-name').text("Now Playing: " + this.songs[index].name)
		$('.song-from-list').css('color', 'black')
		document.querySelectorAll('.song-from-list')[index].style.color = 'red'
		e.target.src = this.songs[index].url;
	}

	editSongsform() {
		localStorage.setItem('songsList', JSON.stringify(this.songs));
		const editSongs = new DynamicPopup('./html/editSongs.html', this.playlistId);
		editSongs.build();
		editSongs.closeWithEsc();
	}

	animatePause() {$('.player-image').removeClass('rotate')};
	animatePlay() {$('.player-image').addClass('rotate')};
}