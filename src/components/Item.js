import React, { Component } from 'react';
import Blockies from 'react-blockies';
import Button from '@userfeeds/button';

class Item extends Component {
  constructor(props) {
    super(props);

    const { author } = props.item;
    this.state = {
      token: `${author.slice(0, 5)}...${author.slice(-3)}`,
      boost: {}
    };

     this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name) {
    return (event) => {
      let data = {};
      data[name] = event.target.value;
      this.setState({boost: data});  
    }
  }

  render() {
    return (
      <article class="itemsEach">
        <div class="itemsEach-content">
          <p>
            <a
              href={this.props.item.target}
              target="_blank">
              {this.props.item.target}
            </a>
          </p>
          Promote with <input type="text" value={this.state.boost[this.props.item.id]} onChange={this.handleChange(this.props.item.id)} /> 
          <Button
            claim={{claim:{
              target: this.props.item.id,
            }}}
            assetAddress={this.props.asset}
            network={this.props.network}
            recepientAddress={this.props.recipient}
            value={this.state.boost[this.props.item.id]}
          >Boost</Button>
        </div>
        <div class="itemsEach-sth">
          <figure class="image is-rounded">
            <Blockies seed={this.props.item.author} />
          </figure>
          <div>
          {this.props.item.author}
            <code>{this.state.token}</code>
            <small>{this.props.item.score/100}</small>
          </div>
        </div>
      </article>
    );
  }
}

export default Item;