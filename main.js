import { plotChart } from './utils.js';

const EVENTS_TEXTAREA_ID = 'eventsSequence';
const CHART_ID = 'browsersResponseTimeChart';
const BUTTON_ID = 'submitButton';

const labels = ['00:00', '00:01'];

window.onload = () => {
  const eventsSequence = document.getElementById(EVENTS_TEXTAREA_ID);
  const btn = document.getElementById(BUTTON_ID);

  btn.addEventListener('click', () => {
    plotChart(
      eventsSequence.value,
      labels,
      CHART_ID
    );
  });
}
