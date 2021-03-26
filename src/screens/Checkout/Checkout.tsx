/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {BrandLogo, ClosingCross, Spinner} from '../../base-components/Icons';
import {TabbySpinner} from '../../base-components/TabbySpinner';
import {ROUTES, StyleGuide, TabbyPurchaseType} from '../../constants';
import {tabbyApiHost, tabbyApiKey} from '../../constants/api';
import {CheckoutSession} from '../../constants/payment';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {notify} from '../../utils/notifier';

type CheckoutScreenNavigationProp = StackNavigationProp<
  HomeStackParamsList,
  ROUTES.Home
>;

interface Props {
  navigation: CheckoutScreenNavigationProp;
  route: RouteProp<HomeStackParamsList, ROUTES.Checkout>;
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    backgroundColor: StyleGuide.colors.brand,
    marginVertical: 12,
  },
  buttonDisabled: {
    backgroundColor: StyleGuide.colors.disabled,
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
  withOpacity: {opacity: 0.5},
  exampleBox: {paddingVertical: 12},
  withMargin: {marginBottom: 24},
});

const Checkout: React.FC<Props> = ({navigation, route}: Props) => {
  const {top, bottom: paddingBottom} = useSafeAreaInsets();
  const [sessionId, setSessionId] = React.useState<string>('');
  const [products, setProducts] = React.useState<TabbyPurchaseType[]>([]);
  console.log(products);

  const {payload} = route.params;

  const handleCancel = () => {
    navigation.goBack();
    notify({
      message: '⛔️ You cancelled checkout process',
      floating: true,
    });
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
        body: JSON.stringify(payload),
      })
        .then((resp) => {
          if (resp.ok) {
            return resp.json().then((data) => {
              const {
                id,
                configuration: {available_products},
              } = data as CheckoutSession;
              setSessionId(id);
              const availableProducts: TabbyPurchaseType[] = [];
              if (available_products.installments) {
                availableProducts.push('installments');
              }
              if (available_products.pay_later) {
                availableProducts.push('paylater');
              }
              setProducts(availableProducts);
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
  }, [navigation, payload]);

  const handlePayLaterPress = async () => {
    navigation.navigate(ROUTES.Payment, {
      type: 'paylater',
      sessionId,
      merchantCode: payload.merchant_code,
    });
  };

  const handleInstallmentsPress = async () => {
    navigation.navigate(ROUTES.Payment, {
      type: 'installments',
      sessionId,
      merchantCode: payload.merchant_code,
    });
  };

  if (!sessionId) {
    return (
      <View
        style={[
          styles.container,
          styles.centered,
          {
            paddingTop: top || 12,
            paddingBottom,
          },
        ]}>
        <TabbySpinner />
      </View>
    );
  }

  const withPaylater = products.includes('paylater');
  const withInstallments = products.includes('installments');

  return (
    <View style={[styles.container, {paddingTop: top || 12, paddingBottom}]}>
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
        <TouchableOpacity onPress={handleCancel}>
          <ClosingCross fill="rgba(41, 41, 41, 0.5)" size={32} />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <View style={styles.container} />
        <View style={[styles.exampleBox, styles.centered]}>
          <TouchableOpacity
            onPress={handlePayLaterPress}
            style={[
              styles.button,
              !withPaylater ? styles.buttonDisabled : undefined,
            ]}
            disabled={!withPaylater}>
            <Text
              style={[
                styles.buttonText,
                !withPaylater ? styles.withOpacity : undefined,
              ]}>
              Pay later
            </Text>
            <Spinner size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleInstallmentsPress}
            style={[
              styles.button,
              !withInstallments ? styles.buttonDisabled : undefined,
            ]}
            disabled={!withInstallments}>
            <Text
              style={[
                styles.buttonText,
                !withInstallments ? styles.withOpacity : undefined,
              ]}>
              Pay in installments
            </Text>
            <Spinner size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {Checkout};
