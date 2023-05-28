$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    var textareaValue = $(this).val();
    var charactersLeft = 140 - textareaValue.length;
    console.log(charactersLeft);

    var counterElement = $(this).closest('.new-tweet').find(".counter");

    counterElement.text(charactersLeft);

    if (charactersLeft < 0) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }
  });
});