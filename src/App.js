import React, { Component } from 'react';

import Navbar from './components/Navbar';
import Header from './components/Header';
import Item from './components/Item';
import {FormSingle ,FormMultiple} from './components/Forms';

import './App.css';

class App extends Component {
  constructor () {
    super();
    this.state = {
      asset: "0xb7fc08177bcba924255132f361084d7994eafcf0",
      network: "ethereum",
      recipient: "0x2577a8539cb2194acd72f035dbb691ce5f406d3f",
      channel: 'https://kwikiel.github.io/TokenX/',
      items: []
    };
    this.fetch();
  }

  async fetch () {
    const API = `https://api.userfeeds.io/ranking/`;
    const response = await fetch(API, {
      method: 'POST',
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        "flow":[
          {
            "algorithm":"experimental_channel_feed",
            "params":{
              "id":this.state.channel
            }
          },
          /*{
            "algorithm":"filter_whitelist",
            "params":{
              "whitelist":"0x2577a8539cb2194acd72f035dbb691ce5f406d3f"
            }
          },*/
          {
            "algorithm":"experimental_value_transfer",
            "params":{
              "asset": this.state.asset,
              "receiver": this.state.recipient
            }
          }
        ]
      })
    });
    const data = await response.json();
    const items = data.items.sort((a,b) => b.score - a.score);
    this.setState({items});
  }

  render() {

    return (
      <div className="App">
        <Navbar />
        <main>
          <Header title="Influencers" />
          <section className="items">
            <div className="container">
              <div>
                <span>Add single URL</span>
                <FormSingle/>
                <hr/>
                <span>Add multiple URLs</span>
                <FormMultiple/>
              </div>
              <hr/>
              {this.state.items.map(item =>
                <Item item={item} asset={this.state.asset} network={this.state.network} recipient={this.state.recipient}/>
              )}
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default App;
