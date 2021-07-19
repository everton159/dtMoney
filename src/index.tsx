import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {createServer, Model} from 'miragejs';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions:[
        {
          id:1,
          title:'Teste',
          type:'deposit',
          category:'dev',
          amount:200,
          createdAt: new Date(),
        },
        {
          id:2,
          title:'Teste 2',
          type:'withdraw',
          category:'dev',
          amount:200,
          createdAt: new Date(),
        },
      ],
      
      })
  },

  routes(){
    this.namespace='api';
    
    this.get('/transactions',()=>{
      return this.schema.all('transaction');
    })

    this.post('/transactions',(schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction',data)

    })

  }
})
    

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
