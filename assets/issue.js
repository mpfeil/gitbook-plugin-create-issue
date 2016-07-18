require(['gitbook'], function (gitbook) {
  gitbook.events.bind('start', function (e, config) {

    var conf = config["create-issue"];
    var label = conf.label;
    var labelSubmit = conf.labelSubmitButton;
    var labelCancel = conf.labelCancelButton;
    var placeholderTitle = conf.placeholder.title;
    var placeholderText = conf.placeholder.text;
    var lang = gitbook.state.innerLanguage;
    if (lang) {
      // label can be a unique string for multi-languages site
      if (typeof label === 'object') label = label[lang];
      if (typeof labelSubmit === 'object') labelSubmit = labelSubmit[lang];
      if (typeof labelCancel === 'object') labelCancel = labelCancel[lang];
      if (typeof placeholderTitle === 'object') placeholderTitle = placeholderTitle[lang];
      if (typeof placeholderText === 'object') placeholderText = placeholderText[lang];

      lang = lang + '/';
    }

    var enableSubmitButton = function() {
      var title = document.querySelector("#issue-title").value;
      var text = document.querySelector("#issue-text").value;
      if (title.length > 0 && text.length > 0) {
        document.querySelector(".tingle-btn--primary").disabled = false;
      } else {
        document.querySelector(".tingle-btn--primary").disabled = true;
      }
    }

    // instanciate new modal
    var modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      onOpen: function() {
          console.log('modal open');
          document.querySelector(".tingle-btn--primary").disabled = true;
          document.querySelector("#issue-title").addEventListener("keyup", enableSubmitButton);
          document.querySelector("#issue-text").addEventListener("keyup", enableSubmitButton);
      },
      onClose: function() {
          console.log('modal closed');
          document.querySelector("#issue-title").removeEventListener("keyup", enableSubmitButton);
          document.querySelector("#issue-text").removeEventListener("keyup", enableSubmitButton);
      }
    });

    // add a button
    modal.addFooterBtn(labelSubmit, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
        modal.close();

    });

    // add another button
    modal.addFooterBtn(labelCancel, 'tingle-btn tingle-btn--danger tingle-btn--pull-right', function() {
        modal.close();

        // clear input fields
        document.querySelector("#issue-title").value = "";
        document.querySelector("#issue-text").value = "";
    });

    gitbook.toolbar.createButton({
      icon: 'fa fa-github',
      label: 'GitHub',
      text: label,
      position: 'left',
      onClick: function() {
        // set content
        modal.setContent('<div class="new-issue"><input class="new-issue-title input input-contrast" id="issue-title" type="text" name="Title" placeholder="'+placeholderTitle+'" value=""><br><textarea class="new-issue-text input input-contrast" id="issue-text" rows="4" cols="50" placeholder="'+placeholderText+'"></textarea></div>');

        // open modal
        modal.open();
      }
    });
  });
});