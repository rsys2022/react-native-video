
import React, { useEffect, useRef, useState } from 'react';
// import shaka from "shaka-player/dist/shaka-player.media";
// import { Text, View, TouchableOpacity } from "react-native";
import Video from './video.web';
const baseUrl =
  'https://e2f9de5d62b647428fb652c48267a777.mediatailor.us-west-2.amazonaws.com';
const mpd_asset_id =
  'b9ae3db57338421f986cc028c88d1f40/64c179c9a6b04128ab4105d723012382/c2fa5c88342340349588b8dc8a73f0c4/index.mpd';

const App = (props) => {
  const ref = useRef(null);

  const [manifestUrl, setManifestUrl] = useState('');
  const [tracking_response, setTrackingResponse] = useState(null);

  async function handleMpdApi() {
    const baseAdUrl = `${baseUrl}/v1/session/9a39c1f787063acfe5de4814e922e22605c1572d/skipAdTest/${mpd_asset_id}`;
    await fetch(baseAdUrl, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        adsParams: {
          deviceType: 'ipad',
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {throw Error(response.statusText);}
        return response.json();
      })
      .then(async (data) => {
        const manifest_url = `${baseUrl}${data.manifestUrl}`;
        const tracking_url = `${baseUrl}${data.trackingUrl}`;
        await fetch(manifest_url).then((response) => {
          if (!response.ok) {throw Error(response.statusText);}
          return response.text();
        });
        const tracking_response = await fetch(tracking_url).then((response) => {
          if (!response.ok) {throw Error(response.statusText);}
          return response.json();
        });
        setTrackingResponse(tracking_response);
        setManifestUrl(manifest_url);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  useEffect(() => {
    handleMpdApi();
  }, []);

  if (manifestUrl === '') {
    return <div />;
  }

  return (
    <div style={{ flex: 1 }}>
      <Video
        chromeless={true}
        autoPlay={true}
        src={manifestUrl}
        controls={true}
        ref={ref}
        muted={true}
        onLoaded={(e) => {
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
        trackingJson={tracking_response}
        onError={(e) => console.log('erroe')}
      />
    </div>
  );
};

export default App;