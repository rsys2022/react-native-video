
import { Animated,} from 'react-native';
import {
  SpatialNavigationNode,
  useSpatialNavigatorFocusableAccessibilityProps,
} from 'react-tv-space-navigation';
import styled from '@emotion/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ButtonContent = (props) => {
  const { isFocused, label, type } = props;
  const accessibilityProps = useSpatialNavigatorFocusableAccessibilityProps();
  return (
    <Container
      isFocused={isFocused}
      {...accessibilityProps}>
      {type === 'icon' ? (
        <Icon
          name={label}
          size={18}
          color={isFocused ? 'black' : 'white'}
          style={ { paddingHorizontal: 10 }}
        />
      ) : (
        <StyledText isFocused={isFocused}>{label}</StyledText>
      )}
    </Container>
  );
};

ButtonContent.displayName = 'ButtonContent';

export const Button = ({ label, onSelect, type }) => {
    return (
      <SpatialNavigationNode orientation='horizontal' isFocusable={true} onSelect={onSelect}>
        {({ isFocused }) => (
          <ButtonContent label={label} isFocused={isFocused} type={type} />
        )}
      </SpatialNavigationNode>
    );
};

const Container = styled(Animated.View)(({ isFocused }) => ({
  alignSelf: 'baseline',
  backgroundColor: isFocused ? 'white' : 'transparent',
  padding: 5,
  borderRadius: 10,
}));

const StyledText = styled.Text((isFocused) => ({
	color:isFocused? 'black' : 'white',
	flexWrap: 'wrap',
	// width: ,
  }));