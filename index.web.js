import React, {Component} from 'react';
import Video from './web';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.player = { 
      ref: Video
    }
  }

  render() {
    return <Video ref={(videoRef)=> this.player.ref = videoRef} {...this.props} />
  }
}
