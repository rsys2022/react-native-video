import React, {Component} from 'react';
import { Platform} from 'react-native';
import AppPlayer from './Video.App';
console.log("Platform.OS", Platform.OS)
// const Module = Platform.OS === 'web' ? require('./Video.web') : require('./Video.App')

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