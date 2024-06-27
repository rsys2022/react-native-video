
import React, { useRef } from 'react';
import Video from './video.web';
// const baseUrl =
//   'https://e2f9de5d62b647428fb652c48267a777.mediatailor.us-west-2.amazonaws.com';
// const mpd_asset_id =
//   'b9ae3db57338421f986cc028c88d1f40/64c179c9a6b04128ab4105d723012382/c2fa5c88342340349588b8dc8a73f0c4/index.mpd';

const App = props => {
  const ref = useRef(null);
  return (
    <div>
      <Video
        chromeless={true}
        autoPlay={true}
        src={props.source.uri}
        controls_={props.control}
        ref={ref}
        muted={true}
        onLoaded={(e) => {

          if(ref.current === undefined || ref.current === null){
            return
          }
          const b = ref.current.videoElement.buffered;
          const time = ref.current.videoElement.currentTime;
          const gapTolerance = 0.08;
          if (!b || !b.length) {
            return 0;
          }
          // Workaround Safari bug: https://bit.ly/2trx6O8
          if (b.length === -1 && b.end(0) - b.start(0) < 1e-6) {
            return 0;
          }
          let result = 0;
          if (b.length >= 1) {
            const end = b.end(0);
            const start = b.start(0);
            if (end > time) {
              result = start + gapTolerance;
            }
          }
          ref.current.videoElement.currentTime = result;
          console.log('result seeking to', result);
        }}
        trackingJson={props.trackingJson}
        onError={(e) => console.log('erroe', error)}
      />
    </div>
  );
};

export default App;