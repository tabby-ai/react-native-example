/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import {Round1, Round2, Round3, Round4} from './Icons';

interface Props {
  price: string; // 300
  currency: 'AED' | 'SAR' | 'KWD' | 'BDH';
  lang: 'en' | 'ar';
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress: () => void;
}

type Loc = {en: string; ar: string};

const STRINGS: {[key: string]: Loc} = {
  promoMessage: {
    en: 'No fees. Pay with any card.',
    ar: 'ةقاطب يأ مادختساب عفدا .موسر نودب.',
  },
  today: {en: 'Today', ar: 'مويلا'},
  m1: {en: 'In 1 month', ar: 'رهش دعب'},
  m2: {en: 'In 2 months', ar: 'نيرهش دعب'},
  m3: {en: 'In 3 months', ar: 'رهشأ ٣ دعب'},
};

const decimals = {
  AED: 2,
  SAR: 2,
  KWD: 3,
  BDH: 3,
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginHorizontal: 12,
    backgroundColor: '#fff',
  },
  titleText: {
    textAlign: 'left',
    color: '#54545C',
    fontSize: 14,
    marginBottom: 24,
    paddingHorizontal: 12,
  },
  f1: {flex: 1},
  underline: {textDecorationLine: 'underline'},
  wSpacer: {width: 8},
  hSpacer: {height: 16},
  withBg: {backgroundColor: '#fff'},
  box: {height: 22},
  amount: {fontWeight: '700'},
  when: {fontSize: 11, textAlign: 'left'},
  divider: {
    position: 'absolute',
    top: 26 / 2,
    left: 26 / 2,
    right: 26 / 2 + 10,
    height: 0.5,
    backgroundColor: '#54545C',
  },
});

const TabbyCheckoutSnippet: React.FC<Props> = ({
  lang,
  price,
  currency,
  containerStyle,
  textStyle,
  onPress,
}: Props) => {
  const {isRTL} = I18nManager;
  const splitted = (parseFloat(price) / 4).toFixed(decimals[currency]);
  const splittedPrice = isRTL
    ? `${currency} ${splitted}`
    : `${splitted} ${currency}`;
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={[{flex: 1}, styles.container, containerStyle]}>
        <View>
          <Text style={[styles.titleText, textStyle]}>
            {STRINGS.promoMessage[lang]}
          </Text>
        </View>
        <View style={styles.withBg}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 4,
            }}>
            <View style={styles.divider} />
            <View>
              <Round1 size={26} />
              <View style={styles.hSpacer} />
              <View style={styles.box}>
                <Text style={[styles.amount, styles.when]}>
                  {splittedPrice}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.when}>{STRINGS.today[lang]}</Text>
              </View>
            </View>
            <View style={styles.f1} />
            <View>
              <Round2 size={26} />
              <View style={styles.hSpacer} />
              <View style={styles.box}>
                <Text style={[styles.amount, styles.when]}>
                  {splittedPrice}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.when}>{STRINGS.m1[lang]}</Text>
              </View>
            </View>
            <View style={styles.f1} />
            <View>
              <Round3 size={26} />
              <View style={styles.hSpacer} />
              <View style={styles.box}>
                <Text style={[styles.amount, styles.when]}>
                  {splittedPrice}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.when}>{STRINGS.m2[lang]}</Text>
              </View>
            </View>
            <View style={styles.f1} />
            <View style={styles.withBg}>
              <Round4 size={26} />
              <View style={styles.hSpacer} />
              <View style={styles.box}>
                <Text style={[styles.amount, styles.when]}>
                  {splittedPrice}
                </Text>
              </View>
              <View style={styles.box}>
                <Text style={styles.when}>{STRINGS.m3[lang]}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {TabbyCheckoutSnippet};
