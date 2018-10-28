import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const useFetch = url => {
  const [data, setData] = useState(null);
  useEffect(
    () => {
      if (data === null)
        sleep(Math.random() * 1000 * 2)
          .then(() => window.fetch(url))
          .then(x => x.json())
          .then(x => setData(x[Object.keys(x)[0]]));
    },
    [data]
  );
  return data;
};

const useKrautipsum = (...resources) =>
  resources.reduce(
    (acc, res) => ({
      ...acc,
      [res]: useFetch(`https://krautipsum.de/api/${res}`)
    }),
    {}
  );

const App = props => {
  const kraut = useKrautipsum('greeting', 'noun', 'verb', 'adjective');
  return (
    <div>
      <pre>{JSON.stringify(kraut, null, 2)}</pre>
    </div>
  );
};

render(<App />, document.getElementById('app'));
