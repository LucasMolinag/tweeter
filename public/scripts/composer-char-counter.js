/*
Count number of characters available to be used to write the tweet - down from 140
*/

function setCharactersCounter(textarea) {
  let textareaValue = textarea.val();
  let charactersLeft = 140 - textareaValue.length;

  let counterElement = textarea.closest('.new-tweet').find(".counter");

  counterElement.text(charactersLeft);

  //Invalidation conditional
  if (charactersLeft < 0) {
    counterElement.addClass('invalid');
  } else {
    counterElement.removeClass('invalid');
  }
}

$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    setCharactersCounter($(this));
  });
});
