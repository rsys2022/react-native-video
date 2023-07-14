import React, {Component} from 'react';
import WebPlayer from './web';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <WebPlayer {...this.props} />
  }
}
