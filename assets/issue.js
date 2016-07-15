require(['gitbook'], function (gitbook) {
  gitbook.events.bind('start', function (e, config) {

    var conf = config["create-issue"];
    var label = conf.label;
    var labelSubmit = conf.labelSubmitButton;
    var labelCancel = conf.labelCancelButton;
    var lang = gitbook.state.innerLanguage;
    if (lang) {
      // label can be a unique string for multi-languages site
      if (typeof label === 'object') label = label[lang];
      if (typeof labelSubmit === 'object') labelSubmit = labelSubmit[lang];
      if (typeof labelCancel === 'object') labelCancel = labelCancel[lang];

      lang = lang + '/';
    }

    // instanciate new modal
    var modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen: function() {
          console.log('modal open');
          //TODO maybe set title
      },
      onClose: function() {
          console.log('modal closed');
          //TODO submit new issue
      }
    });

    // add a button
    modal.addFooterBtn(labelSubmit, 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        modal.close();
    });

    // add another button
    modal.addFooterBtn(labelCancel, 'tingle-btn tingle-btn--danger', function() {
        // here goes some logic
        modal.close();
    });

    gitbook.toolbar.createButton({
      icon: 'fa fa-github',
      label: 'GitHub',
      text: label,
      position: 'left',
      onClick: function() {
        // set content
        modal.setContent('<div>First name: <input type="text" name="FirstName" value="Mickey"><br></div>');

        // open modal
        modal.open();
      }
    });
  });
});