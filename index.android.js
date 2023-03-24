import React, {Component} from 'react';
import AppAndroidPlayer from './Video.App';
class AndroidPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <AppAndroidPlayer {...this.props}  ref={this.props.innerRef} />
    
  }
}

export default React.forwardRef((props, ref) => <AndroidPlayer 
  innerRef={ref} {...props}
/>);