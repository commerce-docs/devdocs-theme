var pageSurvey = (function() {

  var defaults = {
    parentElement: 'content-wrap',
    className: 'page-survey',
    doneClassName: 'submited',
    answers: [
      { 
        label: "Yes",
        value: 1
      },
      {
        label: "No",
        value: 0
      }
    ],
    message: 'Did you find what you were looking for?',
    doneMessage: 'Thanks for your feedback!',
  };

  var element = document.createElement('div');

  var buildHtml = function () {
    element.classList.add(defaults.className);
    var messageHtml = '<h4 class="'+ defaults.className +'-title">' + defaults.message + '</h4>';
    var buttons = defaults.answers.map( function(answer) {
      return '<button class="btn btn-medium" data-value="' + answer.value + '">' + answer.label + '</button>';
    });
    buttonsHtml = '<div class="'+ defaults.className + '-buttons">' + buttons.join('') + '</div>';
    
    var doneMessageHtml = '<h4 class="'+ defaults.className +'-title">' + defaults.doneMessage + '</h4>';
  
    var questionsHtml = '<div class="'+ defaults.className + '-questions">' + messageHtml + buttonsHtml + '</div>';
    var doneHtml = '<div class="'+ defaults.className + '-done">' + doneMessageHtml + '</div>';

    element.innerHTML = questionsHtml + doneHtml;
  }

  var assignEvents = function() {
    var buttons = element.getElementsByTagName('button');
    for (var i = 0; i < buttons.length; i++) {
      var button = buttons[i];
      button.onclick = handleButtonClick;
    }
  };

  var handleButtonClick = function(event) {
    console.log(event);
    sendData();
    showSuccessMessage();
  };

  var sendData = function() {
    console.log("sending the data...");
  };

  var showSuccessMessage = function() {
    element.classList.add(defaults.doneClassName);
  };

  var render = function() {
    var parent = document.getElementsByClassName(defaults.parentElement)[0];
    if (parent) {
      buildHtml();
      assignEvents();
      parent.appendChild(element);
    }
  };

  return {
    init: function() {
      render();
    }
  };

})();

if (window.ga && window.ga.create) {
}
pageSurvey.init();
