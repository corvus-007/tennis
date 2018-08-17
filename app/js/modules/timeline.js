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
