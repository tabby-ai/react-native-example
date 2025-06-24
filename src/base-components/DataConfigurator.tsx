import React from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Currency, Lang} from 'tabby-react-native-sdk';
import {StyleGuide} from '../constants';
import {currencies, langs} from '../constants/constants';

const styles = StyleSheet.create({
  row: {flexDirection: 'row', alignItems: 'center'},
  rowWrap: {flexWrap: 'wrap'},
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
  buttonDisabled: {
    backgroundColor: StyleGuide.colors.disabled,
  },
  buttonText: {
    color: StyleGuide.colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: StyleGuide.colors.disabled,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  divider: {
    marginBottom: 12,
  },
});

const ProductWidgetConfigurator = ({
  amount,
  setAmount,
  currency,
  setCurrency,
  lang,
  setLang,
  merchantCode,
  setMerchantCode,
  email,
  setEmail,
  phone,
  setPhone,
  installmentsCount,
  setInstallmentsCount,
}: {
  amount: string;
  setAmount: (v: string) => void;
  currency: Currency;
  setCurrency: (v: Currency) => void;
  lang: Lang;
  setLang: (v: Lang) => void;
  merchantCode: string;
  setMerchantCode: (v: string) => void;
  email?: string;
  setEmail?: (v: string) => void;
  phone?: string;
  setPhone?: (v: string) => void;
  installmentsCount?: number;
  setInstallmentsCount?: (v: number) => void;
}) => {
  return (
    <View>
      <Text>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        placeholder="Amount"
        keyboardType="number-pad"
      />
      <View style={styles.divider} />
      <Text>Currency</Text>
      <View style={[styles.row, styles.rowWrap]}>
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
      <View style={styles.divider} />
      <Text>Language</Text>
      <View style={[styles.row, styles.rowWrap]}>
        {langs.map(l => (
          <TouchableOpacity
            key={l}
            onPress={() => setLang(l)}
            style={[
              styles.button,
              styles.selectButton,
              lang === l ? undefined : styles.buttonDisabled,
            ]}>
            <Text style={styles.buttonText}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.divider} />
      <Text>Merchant Code</Text>
      <TextInput
        value={merchantCode}
        onChangeText={setMerchantCode}
        style={styles.input}
        autoCapitalize="none"
        placeholder="Merchant code"
      />
      {email && setEmail ? (
        <>
          <View style={styles.divider} />
          <Text>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
          />
        </>
      ) : null}
      {phone && setPhone ? (
        <>
          <View style={styles.divider} />
          <Text>Phone</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            placeholder="Phone"
            keyboardType="phone-pad"
          />
        </>
      ) : null}
      {installmentsCount !== undefined && setInstallmentsCount ? (
        <>
          <View style={styles.divider} />
          <Text>Installments</Text>
          <TextInput
            value={installmentsCount.toString()}
            onChangeText={text => {
              const value = parseInt(text, 10);
              if (value > 0) {
                setInstallmentsCount(value);
              } else {
                setInstallmentsCount(0);
              }
            }}
            style={styles.input}
            placeholder="Installments"
            keyboardType="number-pad"
          />
        </>
      ) : null}
    </View>
  );
};

export {ProductWidgetConfigurator};
