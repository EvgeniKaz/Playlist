class DynamicPopup {
  constructor(url, id) {
    this.url = url;
    this.id = id;
  }

    build() {
      const popupCon = $('<div>', {
        class: 'popupCon'
      })

      const formCon = $('<div>', {
        class: 'formCon'
      }).appendTo(popupCon);

      $('<button>', {
        text: "❌",
        class: "closeFormPopup",
        click: this.closeFormPopup.bind(this),
      }).appendTo(formCon);


      fetch(this.url)
        .then(response => response.text())
        .then(html => {
          $('.formCon').append($(html));
          $('form').attr('data-play_id', this.id);
          $('#DeleteBtns').attr('data-id', this.id);
        });

      popupCon.appendTo('body');
    }



    closeWithEsc() {
      $(document).keydown(function (e) {
        if (e.keyCode == 27) {
          this.closeFormPopup();
        }
      }.bind(this));
    }
    closeFormPopup() {
      $('.popupCon').remove();
    }
}