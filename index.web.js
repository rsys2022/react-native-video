import React, {Component} from 'react';
import Video from './web';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Video {...this.props} />
  }
}
