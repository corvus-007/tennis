'use strict';

window.util = (function () {
  return {
    KEYCODE_ESC: 27,
    setMaxHeight: function (selector) {
      var maxHeight;
      var elements = document.querySelectorAll(selector);

      if (!elements.length) {
        return;
      }

      maxHeight = Array.from(elements).reduce(function findMaxHeight(prevValue, element) {
        var currentValue = element.offsetHeight;
        return (prevValue > currentValue) ? prevValue : currentValue;
      }, 0);

      Array.from(elements).forEach(function specifyMaxHeight(it) {
        it.style.height = maxHeight + 'px';
      });
    },
    getScrollbarWidth: function () {
      var div = document.createElement('div');

      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';

      document.body.appendChild(div);
      var scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);

      return scrollWidth;
    },
  }
})();

window.outCover = (function() {
  'use strict';

  var $ = window.jQuery;
  var outCover = document.querySelector('.out-cover');
  var outCoverBody = outCover.querySelector('.out-cover__body');
  var outCoverMobileNavWrapper = outCover.querySelector(
    '.out-cover__mobile-nav-wrapper'
  );
  var outCoverFooter = outCover.querySelector('.out-cover__footer');
  var outCoverToggle = document.querySelector('.out-cover-toggle');
  var scrollWidth = window.util.getScrollbarWidth();
  var scrollPageValue = 0;

  var onOutCoverEscPress = function(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideOutCover();
    }
  };

  var showOutCover = function() {
    scrollPageValue = window.pageYOffset;
    document.body.classList.add('no-scroll', 'is-out-cover-opened');
    outCoverToggle.classList.add('out-cover-toggle--fired');
    outCover.classList.add('out-cover--opened');
    document.addEventListener('keydown', onOutCoverEscPress);
  };

  var hideOutCover = function() {
    outCover.classList.remove('out-cover--opened');
    document.body.classList.remove('no-scroll', 'is-out-cover-opened');
    outCoverToggle.classList.remove('out-cover-toggle--fired');
    window.scrollTo(0, scrollPageValue);
    document.removeEventListener('keydown', onOutCoverEscPress);
  };

  outCoverToggle.addEventListener('click', function(event) {
    event.preventDefault();

    if (!this.classList.contains('out-cover-toggle--fired')) {
      showOutCover();
    } else {
      hideOutCover();
    }

  });

  return {
    mainNavWrapper: outCoverMobileNavWrapper,
    show: showOutCover,
    hide: hideOutCover
  };
})();

function Timeline(params) {
  var self = this;

  this.lastTextBlock = null;
  this.timeline = params.timeline;
  this.buttonText = params.buttonTextToExpand;
  this.buttonText2 = params.buttonTextToCut;
  this.timelineTextItems = this.timeline.querySelectorAll('.timeline__text');

  for (var textBlock of this.timelineTextItems) {
    textBlock.insertAdjacentElement('afterend', createToggleButton());
    textBlock.classList.add('timeline__text--cut');
  }

  function createToggleButton() {
    var button = document.createElement('button');

    button.className = 'timeline__button';
    button.textContent = self.buttonText;

    return button;
  }

  this.timeline.addEventListener('click', function (event) {
    self.handlerButtonClick(event);
  });

  this.cutAllText();
}

Timeline.prototype.cutAllText = function () {
  for (var textBlock of this.timelineTextItems) {
    var button = textBlock.nextElementSibling;

    if (textBlock === this.lastTextBlock) {
      continue;
    }

    textBlock.style.height = '';
    textBlock.classList.remove('timeline__text--expanded');
    button.textContent = this.buttonText;
  }
}

Timeline.prototype.handlerButtonClick = function (event) {
  var target = event.target;
  var button = target.closest('.timeline__button');

  if (!button) {
    return;
  }

  var item = button.closest('.timeline__item');

  var textBlock = item.querySelector('.timeline__text');
  var isEqualHeight = textBlock.offsetHeight === textBlock.scrollHeight;

  textBlock.style.height = !isEqualHeight ? textBlock.scrollHeight + 'px' : '';
  button.textContent = !isEqualHeight ? this.buttonText2 : this.buttonText;
  textBlock.classList.toggle('timeline__text--expanded', !isEqualHeight);

  this.lastTextBlock = textBlock;
  this.cutAllText();
}

// class Timeline {
//   constructor({
//     timeline,
//     buttonTextToExpand,
//     buttonTextToCut
//   }) {
//     var self = this;

//     this.lastTextBlock = null;
//     this.timeline = timeline;
//     this.buttonText = buttonTextToExpand;
//     this.buttonText2 = buttonTextToCut;
//     this.timelineTextItems = timeline.querySelectorAll('.timeline__text');

//     for (var textBlock of this.timelineTextItems) {
//       textBlock.insertAdjacentElement('afterend', createToggleButton());
//       textBlock.classList.add('timeline__text--cut');
//     }

//     function createToggleButton() {
//       var button = document.createElement('button');

//       button.className = 'timeline__button';
//       button.textContent = self.buttonText;

//       return button;
//     }

//     this.timeline.addEventListener('click', function (event) {
//       self.handlerButtonClick(event);
//     });

//     this.cutAllText();
//   }

//   cutAllText() {
//     for (var textBlock of this.timelineTextItems) {
//       var button = textBlock.nextElementSibling;

//       if (textBlock === this.lastTextBlock) {
//         continue;
//       }

//       textBlock.style.height = '';
//       textBlock.classList.remove('timeline__text--expanded');
//       button.textContent = this.buttonText;
//     }
//   }

//   handlerButtonClick(event) {
//     var target = event.target;
//     var button = target.closest('.timeline__button');

//     if (!button) {
//       return;
//     }

//     var item = button.closest('.timeline__item');

//     var textBlock = item.querySelector('.timeline__text');
//     var isEqualHeight = textBlock.offsetHeight === textBlock.scrollHeight;

//     textBlock.style.height = !isEqualHeight ? textBlock.scrollHeight + 'px' : '';
//     button.textContent = !isEqualHeight ? this.buttonText2 : this.buttonText;
//     textBlock.classList.toggle('timeline__text--expanded', !isEqualHeight);

//     this.lastTextBlock = textBlock;
//     this.cutAllText();
//   }
// }

