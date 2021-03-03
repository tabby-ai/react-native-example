/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {ClosingCross} from '../../base-components/Icons';
import {TabbySpinner} from '../../base-components/TabbySpinner';
import {ROUTES, StyleGuide} from '../../constants';
import {webViewUrls} from '../../constants/urls';
import {HomeStackParamsList} from '../../navigator/HomeStack';

type PaymentScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.SnippetWebView
>;

interface Props {
  navigation: PaymentScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.SnippetWebView>;
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: StyleGuide.colors.white},
});

const SnippetWebView = ({route, navigation}: Props) => {
  const [ready, setReady] = React.useState(false);
  const {top: paddingTop, bottom: paddingBottom} = useSafeAreaInsets();

  const {
    params: {url},
  } = route;

  const back = () => {
    navigation.goBack();
  };

  const handleLoadEnd = React.useCallback(() => {
    setReady(true);
  }, []);
  return (
    <View style={[styles.container, {paddingTop, paddingBottom}]}>
      <WebView source={{uri: url}} onLoad={handleLoadEnd} />
      <TouchableOpacity
        onPress={back}
        style={{
          position: 'absolute',
          top: paddingTop || 12,
          right: 12,
        }}>
        <ClosingCross fill="rgba(41, 41, 41, 0.5)" size={32} />
      </TouchableOpacity>
      {!ready ? (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <TabbySpinner isRTL={url === webViewUrls.ar} />
        </View>
      ) : null}
    </View>
  );
};

export {SnippetWebView};
