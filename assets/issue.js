require(['gitbook', 'jQuery'], function (gitbook, $) {
  gitbook.events.bind('start', function (e, config) {

    var conf = config["create-issue"];

    var github = conf.github;
    if (github === undefined) { return; }

    var label = conf.label;
    var labelSubmit = conf.labelSubmitButton;
    var labelCancel = conf.labelCancelButton;
    var placeholderTitle = conf.placeholder.title;
    var placeholderText = conf.placeholder.text;
    var alertInfoText = conf.alert.info;
    var alertDangerText = conf.alert.danger;

    var lang = gitbook.state.innerLanguage;
    if (lang) {
      // label can be a unique string for multi-languages site
      if (typeof label === 'object') label = label[lang];
      if (typeof labelSubmit === 'object') labelSubmit = labelSubmit[lang];
      if (typeof labelCancel === 'object') labelCancel = labelCancel[lang];
      if (typeof placeholderTitle === 'object') placeholderTitle = placeholderTitle[lang];
      if (typeof placeholderText === 'object') placeholderText = placeholderText[lang];
      if (typeof alertInfoText === 'object') alertInfoText = alertInfoText[lang];
      if (typeof alertDangerText === 'object') alertDangerText = alertDangerText[lang];

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
          document.querySelector(".tingle-btn--primary").disabled = true;
          document.querySelector("#issue-title").addEventListener("keyup", enableSubmitButton);
          document.querySelector("#issue-text").addEventListener("keyup", enableSubmitButton);
      },
      onClose: function() {
          document.querySelector("#issue-title").value = "";
          document.querySelector("#issue-text").value = "";
          document.querySelector("#issue-title").removeEventListener("keyup", enableSubmitButton);
          document.querySelector("#issue-text").removeEventListener("keyup", enableSubmitButton);
          document.querySelector("#alert-container").classList.add("hidden");
          document.querySelector("#alert-container").classList.remove("alert-info");
          document.querySelector("#alert-container").classList.remove("alert-danger");
      }
    });

    // add a button
    modal.addFooterBtn(labelSubmit, 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
      $.ajax({
        type: 'POST',
        url: 'https://api.github.com/repos/'+github.repo+'/issues',
        data: '{"title":"'+document.querySelector("#issue-title").value+'","body":"'+document.querySelector("#issue-title").value+'"}',
        dataType: 'json',
        headers: {
          'Authorization':'token '+ github.token,
          'Content-Type':'application/json'
        },
        success: function(data) {
          document.querySelector("#alert-container").classList.remove("alert-danger");
          document.querySelector("#alert-container").classList.remove("hidden");
          document.querySelector("#alert-container").classList.add("alert-info");
          document.querySelector("#alert-container").innerHTML = alertInfoText + '<a href="'+data.html_url+'"_blank"><i class="fa fa-external-link" aria-hidden="true"></i></a>';
        },
        error: function(data) {
          document.querySelector("#alert-container").classList.remove("alert-info");
          document.querySelector("#alert-container").classList.remove("hidden");
          document.querySelector("#alert-container").classList.add("alert-danger");
          document.querySelector("#alert-container").innerHTML = alertDangerText;
        }
      });
      
    });

    modal.addFooterBtn(labelCancel, 'tingle-btn tingle-btn--danger tingle-btn--pull-right', function() {
        modal.close();
    });

    gitbook.toolbar.createButton({
      icon: 'fa fa-github',
      label: 'GitHub',
      text: label,
      position: 'left',
      onClick: function() {
        // set content
        modal.setContent('<div class="new-issue"><div class="alert hidden" id="alert-container"></div><input class="new-issue-title input input-contrast" id="issue-title" type="text" name="Title" placeholder="'+placeholderTitle+'" value=""><br><textarea class="new-issue-text input input-contrast" id="issue-text" rows="4" cols="50" placeholder="'+placeholderText+'"></textarea></div>');

        // open modal
        modal.open();
      }
    });
  });
});