/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {BrandLogo, ClosingCross} from '../../base-components/Icons';
import {TabbySpinner} from '../../base-components/TabbySpinner';
import {ROUTES, StyleGuide} from '../../constants';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {notify} from '../../utils/notifier';
import {buildUrl} from '../../utils/webViewUrl';

type PaymentScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.Payment
>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.Payment>;
}

const styles = StyleSheet.create({
  container: {flex: 1},
  centered: {justifyContent: 'center', alignItems: 'center'},
  row: {flexDirection: 'row'},
});

type WebViewResult = 'close' | 'authorized' | 'rejected';

const Payment: React.FC<Props> = ({navigation, route}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();
  const [url, setUrl] = React.useState('');

  const {
    params: {type: productType, sessionId, merchantCode},
  } = route;

  const back = () => {
    navigation.navigate(ROUTES.Home);
  };

  React.useEffect(() => {
    if (sessionId) {
      const tabbyCheckoutUrl = buildUrl({
        sessionId,
        merchantCode,
        product: productType,
      });
      console.log({tabbyCheckoutUrl});
      setUrl(tabbyCheckoutUrl);
    }
  }, [sessionId, productType, merchantCode]);

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
      style={{
        flex: 1,
        backgroundColor: StyleGuide.colors.white,
        paddingTop: top || 12,
        paddingBottom,
      }}>
      <View
        style={[
          styles.row,
          styles.centered,
          {
            paddingHorizontal: 12,
          },
        ]}>
        <View style={{alignItems: 'center', flex: 1, paddingLeft: 32}}>
          <BrandLogo size={50} />
        </View>
        <TouchableOpacity onPress={back}>
          <ClosingCross fill="rgba(41, 41, 41, 0.5)" size={32} />
        </TouchableOpacity>
      </View>
      {url ? (
        <WebView
          allowFileAccess
          allowFileAccessFromFileURLs
          allowsLinkPreview
          domStorageEnabled
          style={styles.container}
          source={{uri: url}}
          onError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;

            console.log(nativeEvent);
          }}
          enableApplePay
          onHttpError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;
            console.log(nativeEvent);
          }}
          onMessage={({nativeEvent: {data}}) => {
            const d = data as WebViewResult;
            parseMessage(d);
          }}
        />
      ) : (
        <View style={[styles.centered, styles.container]}>
          <TabbySpinner />
        </View>
      )}
    </View>
  );
};

export {Payment};
