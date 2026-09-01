import { View } from 'react-native';

export function Spacer({ size = 16, horizontal = false }) {
  return (
    <View
      style={{
        width: horizontal ? size : 'auto',
        height: horizontal ? 'auto' : size,
      }}
    />
  );
}
