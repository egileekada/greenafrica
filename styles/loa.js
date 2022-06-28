$(document).ready(function () {
  var counter = 0;

  // Start the changing images
  setInterval(function () {
    if (counter == 9) {
      counter = 0;
    }
    counter++;
  }, 3000);

  // Set the percentage off
  loading();
});



function loading() {
  var num = 0;

  for (i = 0; i <= 100; i++) {
    setTimeout(function () {
      $(".loader span").html(num + "%");

      if (num == 100) {
        loading();
      }
      num++;
    }, i * 120);
  }
}
