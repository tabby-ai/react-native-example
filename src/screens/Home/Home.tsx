import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  useWindowDimensions,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  TextInput,
} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  Tabby,
  TabbyProductPageWidget,
  TabbyEnv,
  Currency,
  Lang,
} from 'tabby-react-native-sdk';
import {BrandLogo} from '../../base-components/Icons';
import {ROUTES, StyleGuide} from '../../constants';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {ProductWidgetConfigurator} from '../../base-components/DataConfigurator';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.Home
>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.Home>;
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    backgroundColor: StyleGuide.colors.black,
    marginVertical: 12,
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  selectButton: {
    marginHorizontal: 16,
    width: 120,
  },
  buttonInactive: {
    backgroundColor: StyleGuide.colors.disabled,
  },
  buttonText: {
    color: StyleGuide.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentInfoContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 32,
  },
  container: {flex: 1},
  centered: {justifyContent: 'center', alignItems: 'center'},
  divider: {
    height: 1,
    backgroundColor: StyleGuide.colors.black,
    opacity: 0.3,
    marginHorizontal: 12,
  },
  exampleBox: {paddingVertical: 12},
  withMargin: {marginBottom: 24},
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: StyleGuide.colors.disabled,
    borderRadius: 12,
    padding: 12,
  },
  withPadding: {paddingHorizontal: 12},
});

const Home = ({navigation}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();
  const [apiKey, setApiKey] = React.useState<string>('');
  const [apiKeySubmitted, setApiKeySubmitted] = React.useState<string>('');
  const [env, setEnv] = React.useState<TabbyEnv>(TabbyEnv.PRODUCTION);
  const {width} = useWindowDimensions();

  const [amount, setAmount] = React.useState<string>('500');
  const [currency, setCurrency] = React.useState<Currency>('SAR');
  const [lang, setLang] = React.useState<Lang>('en');
  const [merchantCode, setMerchantCode] = React.useState<string>('ae');
  const [installmentsCount, setInstallmentsCount] = React.useState<number>(4);

  const handleBeginCheckout = async () => {
    navigation.navigate(ROUTES.Checkout);
  };

  if (!apiKeySubmitted) {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, styles.withPadding]}>
          <Pressable
            onPress={Keyboard.dismiss}
            style={[styles.centered, styles.container]}>
            <Text style={styles.title}>Env</Text>
            <View style={styles.row}>
              {[TabbyEnv.PRODUCTION, TabbyEnv.STAGING].map(e => (
                <TouchableOpacity
                  key={e}
                  activeOpacity={1}
                  onPress={() => setEnv(e)}
                  style={[
                    styles.button,
                    styles.selectButton,
                    env === e ? undefined : styles.buttonInactive,
                  ]}>
                  <Text style={styles.buttonText}>{`tabby.${e}`}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.title}>ApiKey (pk_key)</Text>
            <View>
              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="Your api_key"
                style={[
                  styles.input,
                  {
                    width: width - styles.withPadding.paddingHorizontal * 2,
                  },
                ]}
              />
              <TouchableOpacity
                onPress={() => {
                  Tabby.setApiKey(apiKey, env);
                  setApiKeySubmitted(apiKey);
                }}
                disabled={!apiKey}
                style={styles.button}>
                <Text style={styles.buttonText}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: top || 12, paddingBottom}]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.centered}>
          <BrandLogo size={50} />
        </View>
        <View style={styles.container}>
          <View style={styles.exampleBox}>
            <Text style={styles.title}>Product page snippets</Text>
            <ProductWidgetConfigurator
              amount={amount}
              setAmount={setAmount}
              currency={currency}
              setCurrency={setCurrency}
              lang={lang}
              setLang={setLang}
              merchantCode={merchantCode}
              setMerchantCode={setMerchantCode}
              installmentsCount={installmentsCount}
              setInstallmentsCount={setInstallmentsCount}
            />
            <View style={styles.withMargin} />
            <View style={styles.withMargin}>
              <TabbyProductPageWidget
                price={amount}
                currency={currency}
                lang={lang}
                publicKey={apiKey}
                merchantCode={merchantCode}
                installmentsCount={installmentsCount}
              />
            </View>
            <View style={styles.divider} />
            <View style={[styles.exampleBox, styles.centered]}>
              <TouchableOpacity
                onPress={handleBeginCheckout}
                style={styles.button}>
                <Text style={styles.buttonText}>
                  Test Tabby Checkout session
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export {Home};
