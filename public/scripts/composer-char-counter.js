$(document).ready(function() {
  // --- our code goes here ---
  // console.log("This is working")
  const counter = $(".counter")
  $("#tweet-text").on("input", (event)=>{
    const value = event.target.value
    const length = value.length
    const remaining = 140 - length
    counter.text(remaining)
    if (remaining < 0) {
      counter.addClass("counter-warning")
    } else {
      counter.removeClass("counter-warning")
    }
  })
});

//Shorthand line 6-9:
// counter.text(140 - event.target.value.length)
// line 10-14
// counter.toggleClass("counter-warning", remaining < 0)
// debugger to debug