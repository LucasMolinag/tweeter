/*
Count number of characters available to be used to write the tweet - down from 140
*/
$(document).ready(function() {
  $(".new-tweet textarea").on("input", function() {
    let textareaValue = $(this).val();
    let charactersLeft = 140 - textareaValue.length;
    console.log(charactersLeft);

    let counterElement = $(this).closest('.new-tweet').find(".counter");

    counterElement.text(charactersLeft);
//Invalidation conditional
    if (charactersLeft < 0) {
      counterElement.addClass('invalid');
    } else {
      counterElement.removeClass('invalid');
    }
  });
});