/* eslint-disable react-native/no-inline-styles */
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import {
  Currency,
  TabbyProduct,
  Tabby,
  TabbyPurchaseType,
} from 'tabby-react-native-sdk';
import {TabbySpinner} from '../../base-components/TabbySpinner';
import {
  ROUTES,
  StyleGuide,
  getMockPaymentData,
  mockPayment,
} from '../../constants';
import {HomeStackParamsList} from '../../navigator/HomeStack';
import {notify} from '../../utils/notifier';
import {currencies} from '../../constants/constants';

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
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    backgroundColor: StyleGuide.colors.black,
    marginVertical: 12,
  },
  selectButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: StyleGuide.colors.disabled,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: StyleGuide.colors.disabled,
  },
  buttonText: {
    color: StyleGuide.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentInfoContainer: {
    padding: 12,
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

const InputSessionData = ({
  onSessionCreated,
}: {
  onSessionCreated: (arg: {
    sessionId: string;
    availableProducts: TabbyProduct[];
  }) => void;
}) => {
  const [amount, setAmount] = React.useState<string>('500');
  const [currency, setCurrency] = React.useState<Currency>('AED');
  const [email, setEmail] = React.useState<string>(
    mockPayment.payment.buyer.email,
  );
  const [phone, setPhone] = React.useState<string>(
    mockPayment.payment.buyer.phone,
  );
  const [merchantCode, setMerchantCode] = React.useState<string>('ae');
  const [loading, setLoading] = React.useState<boolean>(false);

  const createSession = async () => {
    try {
      setLoading(true);
      const payment = getMockPaymentData({amount, currency, email, phone});
      console.log(payment);
      const {sessionId, availableProducts} = await Tabby.createSession({
        merchant_code: merchantCode,
        lang: 'en',
        ...payment,
      });
      console.log({sessionId, availableProducts});
      onSessionCreated({sessionId, availableProducts});
    } catch (error) {
      console.log(error);
      notify({
        message: '⛔️ Error creating session',
        floating: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <TabbySpinner />
      </View>
    );
  }

  const isReadyToCreateSession =
    !!amount && !!email && !!phone && !!merchantCode;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.paymentInfoContainer}>
        <Text>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
          placeholder="Amount"
          keyboardType="number-pad"
        />
        <Text>Currency</Text>
        <View style={[styles.row, {flexWrap: 'wrap'}]}>
          {currencies.map(c => (
            <TouchableOpacity
              key={c}
              onPress={() => setCurrency(c)}
              style={[
                styles.button,
                styles.selectButton,
                currency === c ? undefined : styles.buttonDisabled,
              ]}>
              <Text style={styles.buttonText}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Text>Phone</Text>
        <TextInput
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <Text>Merchant Code</Text>
        <TextInput
          value={merchantCode}
          onChangeText={setMerchantCode}
          style={styles.input}
          autoCapitalize="none"
          placeholder="Merchant code"
        />
        <TouchableOpacity
          disabled={!isReadyToCreateSession}
          onPress={createSession}
          style={[
            styles.button,
            !isReadyToCreateSession ? styles.buttonDisabled : undefined,
          ]}>
          <Text style={styles.buttonText}>Create session</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const Checkout = ({navigation}: Props) => {
  const [sessionId, setSessionId] = React.useState<string>('');
  const [products, setProducts] = React.useState<TabbyProduct[]>([]);

  const availableProducts = products.reduce(
    (
      acc: {[key in TabbyPurchaseType]: TabbyProduct},
      product: TabbyProduct,
    ) => {
      const type = product.type;
      return {...acc, [type]: product};
    },
    {} as {[key in TabbyPurchaseType]: TabbyProduct},
  );

  const withInstallments = availableProducts.installments;

  const handleInstallmentsPress = async () => {
    if (withInstallments) {
      navigation.navigate(ROUTES.Payment, {
        url: withInstallments.webUrl,
      });
    }
  };

  if (!sessionId) {
    return (
      <View style={styles.container}>
        <InputSessionData
          onSessionCreated={data => {
            setSessionId(data.sessionId);
            setProducts(data.availableProducts);
          }}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.centered]}>
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
          Open webview
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export {Checkout};
