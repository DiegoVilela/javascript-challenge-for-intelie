import { plotChart } from './utils.js';

const EVENTS_TEXTAREA_ID = 'eventsSequence';
const CHART_ID = 'browsersResponseTimeChart';
const BUTTON_ID = 'submitButton';

const labels = ['00:00', '00:01'];

const renderChartCanvas = () => {
  const oldCanvas = document.getElementById(CHART_ID);
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = CHART_ID;
  const wrapper = document.getElementById('chartWrapper');
  wrapper.appendChild(canvas);
}

window.onload = () => {
  const eventsSequence = document.getElementById(EVENTS_TEXTAREA_ID);
  const btn = document.getElementById(BUTTON_ID);

  btn.addEventListener('click', () => {
    renderChartCanvas();

    plotChart(
      eventsSequence.value,
      labels,
      CHART_ID
    );
  });
}
