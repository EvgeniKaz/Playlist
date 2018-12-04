class Playlist {
	constructor (data) {
		this.id = data.id;
		this.name = data.name;
		this.image = data.image;
		this.container = null;
	}

	build () {
		this.container = $('<section>', {class: "playlist", });

		$('<h3>', {
			text: this.name, 
			class: "playlist-name"
		}).appendTo(this.container)

		$('<img>', {
			src: this.image, 
			class: "playlist-image",
			error: function (e) {
				e.target.src = 'playlist.jpg'
			}, 
		}).appendTo(this.container)

		$('<button>', {
			class: "playlist-play-btn",
			css: {'cursor': 'pointer'},
			text: "▶",
		}).appendTo(this.container)

		$('<button>', {
			class: "playlist-delete-btn fas fa-trash-alt",
			css: {'cursor': 'pointer'},
			click: this.deletePlaylist.bind(this)
		}).appendTo(this.container)
		
		this.container.appendTo($('main'))
	}

	registerPlaying() {
		this.container.find('.playlist-play-btn').click(function() {
			new Player(this.id, this.name, this.image)
		}.bind(this));
	}

	deletePlaylist() {
			const deletePlay = new DynamicPopup('./html/deletePlaylist.html', this.id);
			deletePlay.build();
			deletePlay.closeWithEsc();
	}

}