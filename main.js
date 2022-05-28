import { datasets } from './staticDataset.js';

const CHART_ID = 'browsersResponseTimeChart';

const labels = ['00:00', '00:01'];

const data = {
  labels,
  datasets
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
