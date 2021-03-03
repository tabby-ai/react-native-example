/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {BrandLogo, ClosingCross} from '../../base-components/Icons';
import {TabbySpinner} from '../../base-components/TabbySpinner';
import {mockPayment, ROUTES, StyleGuide} from '../../constants';
import {tabbyApiKey, tabbyApiHost} from '../../constants/api';
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

const req = {
  merchant_code: 'ae',
  lang: 'en',
  ...mockPayment,
};

type WebViewResult = 'cancelled' | 'authorized';

const Payment: React.FC<Props> = ({navigation, route}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [url, setUrl] = React.useState('');

  const {
    params: {type: productType},
  } = route;

  const INJECTED_JAVASCRIPT = `(function() {
    var launchTabby = true;
    window.Tabby.onChange = function(data) {
      window.ReactNativeWebView.postMessage(data.payment.status);
      if (data.status === 'created' && launchTabby) {
        Tabby.launch({product: '${productType}'});
        launchTabby = false;
      }
    };
    window.Tabby.onClose = function() {
      window.ReactNativeWebView.postMessage('cancelled');
    };
    })();`;

  const back = () => {
    navigation.goBack();
  };

  React.useEffect(() => {
    const createSession = () => {
      fetch(`${tabbyApiHost}/checkout`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tabbyApiKey}`,
        },
        body: JSON.stringify(req),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json().then((data) => {
              const {id} = data as {id: string};
              setSessionId(id);
            });
          } else {
            navigation.goBack();
            notify({
              message: '⛔️ Error creating session',
              floating: true,
            });
          }
        })
        .catch(() => {
          navigation.goBack();
          notify({
            message: '⛔️ Error creating session',

            floating: true,
          });
        });
    };

    createSession();
  }, [navigation]);

  React.useEffect(() => {
    if (sessionId) {
      const tabbyCheckoutUrl = buildUrl({
        sessionId,
        merchantCode: req.merchant_code,
        product: productType,
      });
      setUrl(tabbyCheckoutUrl);
    }
  }, [sessionId, productType]);

  const handleCancel = () => {
    navigation.goBack();
    notify({
      message: '⛔️ You cancelled checkout process',
      floating: true,
    });
  };

  const handleSuccess = () => {
    navigation.goBack();
    notify({
      message: '🎉 Success',
      floating: true,
    });
  };

  const parseMessage = (msg: WebViewResult) => {
    if (msg === 'cancelled') {
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
          injectedJavaScript={INJECTED_JAVASCRIPT}
          style={styles.container}
          source={{uri: url}}
          onError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;

            console.log(nativeEvent);
          }}
          onHttpError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;
            console.log(nativeEvent);
          }}
          onMessage={({nativeEvent: {data}}) => {
            console.log(data);
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
