module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // ...
      [
        'react-native-reanimated/plugin',
        {
          globals: ['__frame_processorv2'],
        },
      ],
    ],  
  };
};


/*
Finish plugin JS setup:
// In JS/TS
export function frame_processor(frame: Frame) {
  'worklet';
  return __frame_processor(frame);
}

// In babel.config.js
module.exports = {
  // ...
  plugins: [
    // ...
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__frame_processor'],
      },
    ],
  ],
}


*/