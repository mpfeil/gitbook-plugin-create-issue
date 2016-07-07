require(['gitbook'], function (gitbook) {
  gitbook.events.bind('start', function (e, config) {

    var conf = config["create-issue"];
    var label = conf.label;
    var lang = gitbook.state.innerLanguage;
    if (lang) {
      // label can be a unique string for multi-languages site
      if (typeof label === 'object') label = label[lang];

      lang = lang + '/';
    }

    // instanciate new modal
    var modal = new tingle.modal({
      footer: true,
      stickyFooter: false,
      cssClass: ['custom-class-1', 'custom-class-2'],
      onOpen: function() {
          console.log('modal open');
      },
      onClose: function() {
          console.log('modal closed');
      }
    });

    // add a button
    modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        modal.close();
    });

    // add another button
    modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
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