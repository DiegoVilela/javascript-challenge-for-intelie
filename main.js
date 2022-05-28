import { events } from './data.js';
import { browserValues, createDatasets, getDataEvents, osValues } from './utils.js';

const CHART_ID = 'browsersResponseTimeChart';

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

window.onload = () => {
  new Chart(
    document.getElementById(CHART_ID),
    config
  );
}
