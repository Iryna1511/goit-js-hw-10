import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.getElementById('datetime-picker');
const showDays = document.querySelector('span[data-days]');
const showHours = document.querySelector('span[data-hours]');
const showMinutes = document.querySelector('span[data-minutes]');
const showSeconds = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

let userSelectedDate;
let intervalTime;
let intervalId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    intervalTime = userSelectedDate - Date.now();
    if (intervalTime < 1) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
      startBtn.disabled = true;
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', handleStart);
function handleStart(event) {
  startBtn.disabled = true;
  inputEl.disabled = true;

  intervalId = setInterval(() => {
    intervalTime = userSelectedDate - Date.now();
    const showTime = convertMs(intervalTime);
    showDays.textContent = showTime.days.toString().padStart(2, 0);
    showHours.textContent = showTime.hours.toString().padStart(2, 0);
    showMinutes.textContent = showTime.minutes.toString().padStart(2, 0);
    showSeconds.textContent = showTime.seconds.toString().padStart(2, 0);

    if (intervalTime < 1000) {
      clearInterval(intervalId);
      inputEl.disabled = false;
    }
  }, 1000);
}
