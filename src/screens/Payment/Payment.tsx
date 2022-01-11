import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TabbyPaymentWebView} from 'tabby-react-native-sdk';
import {ROUTES, StyleGuide} from '../../constants';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {notify} from '../../utils/notifier';

type PaymentScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.Payment
>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.Payment>;
}

type WebViewResult = 'close' | 'authorized' | 'rejected';

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: StyleGuide.colors.white},
});

const Payment: React.FC<Props> = ({navigation, route}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();

  const {
    params: {url},
  } = route;

  const back = () => {
    navigation.navigate(ROUTES.Home);
  };

  const handleCancel = () => {
    navigation.goBack();
    notify({
      message: '⛔️ You cancelled checkout process',
      floating: true,
    });
  };

  const handleSuccess = () => {
    back();
    notify({
      message: '🎉 Success',
      floating: true,
    });
  };

  const parseMessage = (msg: WebViewResult) => {
    console.log({msg});
    if (msg === 'close' || msg === 'rejected') {
      handleCancel();
    }
    if (msg === 'authorized') {
      handleSuccess();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: top || 12,
          paddingBottom,
        },
      ]}>
      <TabbyPaymentWebView onBack={back} url={url} onResult={parseMessage} />
    </View>
  );
};

export {Payment};
