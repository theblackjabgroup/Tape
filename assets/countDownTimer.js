// Function to update the countdown
function updateCountdown(targetDate, timerValElem) {
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;
  // Calculate days, hours, minutes, and seconds
  var days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  if(days > 0)
  {
    days = days - 1;
  }
  var hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  var minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);


if(days < 0 || hours < 0 || minutes <0 || seconds < 0)
{
    days = 0;
    hours = 0;
    minutes = 0;
    seconds = 0;
}
  // Display the result in the element with id="timer"
  const timerElement = timerValElem.querySelector(".timer");
  timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  // If the countdown is finished, display a message
  if (timeRemaining < 0) {
    clearInterval(countdownInterval);
    timerElement.innerHTML = "EXPIRED";
  }
}

function start() {
  // Set the target date and time (e.g., December 31, 2024, 23:59:59)
  const timerVals = document.getElementsByClassName("countdown");

  if (timerVals.length > 0) {
    Array.from(timerVals).forEach((timerValElem) => {
      const timerVal = timerValElem.getAttribute("data-timer");
      var targetDate = new Date(`${timerVal}T23:59:59`).getTime();

      if(timerVal == "YYYY-MM-DD")
      {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
        const dd = String(today.getDate()).padStart(2, "0");
    
        const formattedDate = `${yyyy}-${mm}-${dd}`;
        targetDate = new Date(`${formattedDate}T23:59:59`).getTime();     
     }
      // Update the countdown every 1 second
      const countdownInterval = setInterval(
        updateCountdown(targetDate, timerValElem),
        1000
      );
    });
  }
}
start();