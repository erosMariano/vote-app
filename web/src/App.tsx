import React, { useState } from 'react';
import { CreatedProposal } from 'types/proposal';

import { api } from './lib/api';

function App() {

  const [allItensInBank, setAllItensInBank] = useState<CreatedProposal[]>();


  const getAllItens = async () => {
    const response = await api.get('/itensVotes');
    const allItens = await response.data;

    setAllItensInBank(allItens)
    console.log(allItens)
  }



  return (
    <div className="App">
      <p>{allItensInBank && allItensInBank[0].community}</p>

      <button onClick={() => getAllItens()}>Puxar dados</button>
    </div>
  );
}

export default App;
