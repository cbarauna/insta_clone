import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

import {Small, Original} from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  smallSource,
  source,
  aspectRatio,
  shouldLoad,
}) {
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (shouldLoad) {
      setLoaded(true);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }
  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizedMode="contain"
      blurRadius={2}>
      {loaded && (
        <OriginalAnimated
          style={{opacity}}
          source={source}
          ratio={aspectRatio}
          resizedMode="contain"
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
}
