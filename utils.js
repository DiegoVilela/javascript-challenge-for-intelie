// Used to get "start" and "span" events
const getEventByType = (eventsObjectList, eventType) => eventsObjectList
  .find(event => event.type === eventType);

// Return delta time in MM:SS format
const getDeltaTime = (eventsObjectList) => {
  const spanEvent = getEventByType(eventsObjectList, 'span');
  const begin = new Date(spanEvent.begin);
  const end = new Date(spanEvent.end);
  const span = (end - begin) / 60000;

  return new Date(span * 1000).toISOString().slice(14, 19);
}

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

export const createEventObject = (text) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#specifying_a_function_as_a_parameter
  const replacer = (_match, p1, _offset, _string) => `\"${p1}\"`;
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

const eventsObject = (events) => events.split('\n').map(event => createEventObject(event));

export const createDatasets = (eventsObject) => {

  // const eventsObjectList = eventsObject(events);
  const dataEvents = getDataEvents(eventsObject);

  const datasets = [];
  for (let os of osValues(dataEvents)) {
    for (let browser of browserValues(dataEvents)) {
      ['min_response_time', 'max_response_time'].forEach((field) => {
        const data = dataEvents
          .filter(event => event.os === os && event.browser === browser)
          .map(event => event[field]);

        if (data.length) {
          datasets.push({
            label: `${os} ${browser} ${field}`,
            backgroundColor: getBackGroundColor(os, browser, field),
            borderColor: getBackGroundColor(os, browser, field),
            data,
          });
        }
      })
    }
  }

  return datasets;
}

export const plotChart = (events, chartId) => {
  const eventsObjectList = eventsObject(events);

  const config = {
    type: 'line',
    data: {
      labels: ['00:00', getDeltaTime(eventsObjectList)],
      datasets: createDatasets(eventsObjectList),
    },
    options: {}
  };

  new Chart(
    document.getElementById(chartId),
    config
  );
}
