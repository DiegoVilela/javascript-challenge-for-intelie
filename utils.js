// Returns events of the type data from a list of events
export const getDataEvents = (eventsList) => eventsList.filter(event => event.type === 'data');

// Distinct values of the 'os' field
export const osValues = (dataEventsList) => dataEventsList
  .map(event => event.os)
  .filter((value, index, array) => array.indexOf(value) === index);

// Distinct values of the 'browser' field
export const browserValues = (dataEventsList) => dataEventsList
  .map(event => event.browser)
  .filter((value, index, array) => array.indexOf(value) === index);

const getBackGroundColor = (os, browser, field) => {
  const item = `${os}-${browser}-${field}`;

  const colors = {
    'linux-chrome-max_response_time': '#007500',
    'linux-chrome-min_response_time': '#8AFF8A',
    'linux-firefox-max_response_time': '#0000FF',
    'linux-firefox-min_response_time': '#7EC8E3',
    'mac-chrome-max_response_time': '#D7A1F9',
    'mac-chrome-min_response_time': '#A020F0',
    'mac-firefox-max_response_time': '#FFB52E',
    'mac-firefox-min_response_time': '#FAD02C',
  }

  return colors[item];
}

// Create datasets from the dataEvents
export const createDatasets = (dataEvents, osValues, browserValues) => {
  const datasets = [];
  for (let os of osValues) {
    for (let browser of browserValues) {
      ['min_response_time', 'max_response_time'].forEach(field => {
        const data = dataEvents
          .filter(event => event.os === os && event.browser === browser)
          .map(event => event[field]);
          datasets.push({
            label: `${os} ${browser} ${field}`,
            backgroundColor: getBackGroundColor(os, browser, field),
            borderColor: getBackGroundColor(os, browser, field),
            data,
        });
      })
    }
  }

  return datasets;
}
