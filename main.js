import { events } from './data.js';
import { browserValues, createDatasets, getDataEvents, osValues } from './utils.js';

const EVENTS_TEXTAREA_ID = 'eventsSequence';
const CHART_ID = 'browsersResponseTimeChart';
const BUTTON_ID = 'submitButton';

const labels = ['00:00', '00:01'];

const dataEvents = getDataEvents(events);

const data = {
  labels: labels,
  datasets: createDatasets(
    dataEvents,
    osValues(dataEvents),
    browserValues(dataEvents)
  )
};

const config = {
  type: 'line',
  data: data,
  options: {}
};

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
const replacer = (_match, p1, _offset, _string) => `\"${p1}\"`;

const createEventObject = (text) => {
  try {
    return JSON.parse(text);
  } catch(SyntaxError) {
    const validJSON = text
      .replace(/'/g, '')
      .replace(/,$/, '')
      .replace(/([a-zA-Z_]+)/g, replacer);

    return JSON.parse(validJSON);
  }
}

window.onload = () => {
  // Plot the chart
  new Chart(
    document.getElementById(CHART_ID),
    config
  );

  // Get DOM elements
  const eventsInput = document.getElementById(EVENTS_TEXTAREA_ID);
  const btn = document.getElementById(BUTTON_ID);

  // Process text into a list of event objects.
  btn.addEventListener('click', () => {
    const events = eventsInput.value;

    events.split('\n').forEach(event => {
      console.log(createEventObject(event));
    });
  });
}
