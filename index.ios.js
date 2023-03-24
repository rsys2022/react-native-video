import React, {Component} from 'react';
import AppPlayer from './Video.App';
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
      return <AppPlayer  {...this.props} ref={this.props.innerRef}/>
    
  }
}

export default React.forwardRef((props, ref) => <Player 
  innerRef={ref} {...props}
/>);