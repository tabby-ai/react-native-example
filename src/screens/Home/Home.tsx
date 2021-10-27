import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BrandLogo, Spinner} from '../../base-components/Icons';
import {TabbyProductPageSnippet} from '../../base-components/TabbyProductPageSnippet';
import {
  mockPaymentText,
  ROUTES,
  StyleGuide,
  mockPayment,
  noop,
} from '../../constants';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {TabbyCheckoutSnippet} from '../../base-components/TabbyCheckoutSnippet';

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.Home
>;

interface Props {
  navigation: HomeScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.Home>;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    backgroundColor: StyleGuide.colors.brand,
    marginVertical: 12,
  },
  buttonText: {
    marginRight: 8,
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
});

const Home: React.FC<Props> = ({navigation}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();

  const handleBeginCheckout = async () => {
    navigation.navigate(ROUTES.Checkout, {
      payload: {...mockPayment, merchant_code: 'ae', lang: 'en'},
    });
  };

  const handleSnippetPress = (lang: 'en' | 'ar') => {
    navigation.navigate(ROUTES.SnippetWebView, {lang});
  };

  return (
    <View style={[styles.container, {paddingTop: top || 12, paddingBottom}]}>
      <ScrollView>
        <View style={styles.centered}>
          <BrandLogo size={50} />
        </View>
        <View style={styles.container}>
          <View style={[styles.exampleBox, styles.centered]}>
            <View style={styles.paymentInfoContainer}>
              <Text>Purchase repsesentation:</Text>
              <Text>{mockPaymentText}</Text>
            </View>
            <TouchableOpacity
              onPress={handleBeginCheckout}
              style={styles.button}>
              <Text style={styles.buttonText}>Pay With Tabby</Text>
              <Spinner size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />
          <View style={styles.exampleBox}>
            <Text style={styles.title}>Product page snippets</Text>
            <TabbyProductPageSnippet
              lang="en"
              currency="AED"
              price={mockPayment.payment.amount}
              containerStyle={styles.withMargin}
              onPress={() => {
                handleSnippetPress('en');
              }}
            />
            <TabbyProductPageSnippet
              lang="ar"
              currency="AED"
              price={mockPayment.payment.amount}
              onPress={() => {
                handleSnippetPress('ar');
              }}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.exampleBox}>
            <Text style={styles.title}>Checkout snippets</Text>
            <TabbyCheckoutSnippet
              lang="en"
              currency="AED"
              price={mockPayment.payment.amount}
              onPress={noop}
            />
            <View style={styles.withMargin} />
            <TabbyCheckoutSnippet
              lang="ar"
              currency="AED"
              price={mockPayment.payment.amount}
              onPress={noop}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export {Home};
