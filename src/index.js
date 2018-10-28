import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const useFetch = url => {
  const [data, setData] = useState(null);
  useEffect(
    () => {
      if (data === null)
        fetch(url)
          .then(x => x.json())
          .then(x => setData(x));
    },
    [data]
  );
  return data;
};

const useKrautipsum = () => {
  const greeting = useFetch(`https://krautipsum.de/api/greeting`);
  const verb = useFetch(`https://krautipsum.de/api/verb`);
  const noun = useFetch(`https://krautipsum.de/api/noun`);
  const adjective = useFetch(`https://krautipsum.de/api/adjective`);
  return { ...greeting, ...adjective, ...noun, ...verb };
};

const App = props => {
  const krautipsum = useKrautipsum();
  return (
    <div>
      <pre>{JSON.stringify(krautipsum, null, 2)}</pre>
    </div>
  );
};

render(<App />, document.getElementById('app'));
