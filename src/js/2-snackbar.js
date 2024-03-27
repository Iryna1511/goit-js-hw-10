import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
const refs = {
  delay: formEl.elements.delay,
  state: formEl.elements.state,
};

formEl.addEventListener('submit', event => {
  event.preventDefault();
  function makePromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }

  const promise = makePromise(refs.delay.value, refs.state.value);

  promise
    .then(delay => {
      iziToast.success({
        color: 'green',
        position: 'topRight',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  formEl.reset();
});
