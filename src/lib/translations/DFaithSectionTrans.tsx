import React from 'react';

export type LangKey = 'de' | 'en' | 'pl';

export const DFaithTranslations: Record<LangKey, {
  title: string;
  subtitle: string;
  points: { title: string; text: string }[];
  ctaEarn: string;
}> = {
  de: {
    title: 'D.FAITH Ecosystem',
    subtitle: 'Werde Teil des D.FAITH Ecosystems — und werde für deine Unterstützung belohnt.',
    points: [
      {
        title: 'Quests erfüllen',
        text: 'Like, kommentiere oder teile Inhalte auf Social Media und sammle Tokens — jederzeit umwandelbar in Solana.'
      },
      {
        title: 'Exklusive Inhalte kaufen',
        text: 'Kaufe mit deinen Tokens limitierte Song-NFTs — oder hol dir Musikvideos samt Song schon vor dem offiziellen Release zum Download.'
      },
      {
        title: 'Collectible Cards sammeln',
        text: 'Zu jedem Song gibt es Sammelkarten. Je aktiver du bist, desto seltener die Karten — und desto höher deine Belohnungen.'
      }
    ],
    ctaEarn: 'Jetzt Ecosystem entdecken',
  },
  en: {
    title: 'D.FAITH Ecosystem',
    subtitle: 'Become part of the D.FAITH Ecosystem — and get rewarded for your support.',
    points: [
      {
        title: 'Complete quests',
        text: 'Like, comment or share content on social media and collect Tokens — convertible into Solana at any time.'
      },
      {
        title: 'Buy exclusive content',
        text: 'Use your Tokens to buy limited Song NFTs — or get music videos with the song as an early download before the official release.'
      },
      {
        title: 'Collect Collectible Cards',
        text: 'Every song has its own collectible cards. The more active you are, the rarer the cards — and the higher your rewards.'
      }
    ],
    ctaEarn: 'Discover the Ecosystem',
  },
  pl: {
    title: 'D.FAITH Ecosystem',
    subtitle: 'Dołącz do D.FAITH Ecosystem — i zdobywaj nagrody za swoje wsparcie.',
    points: [
      {
        title: 'Wykonuj questy',
        text: 'Polub, komentuj lub udostępniaj treści w social mediach i zbieraj Tokeny — wymienialne w każdej chwili na Solana.'
      },
      {
        title: 'Kupuj ekskluzywne treści',
        text: 'Za Tokeny kupujesz limitowane Song NFT — lub zdobywasz teledyski wraz z utworem do pobrania jeszcze przed oficjalną premierą.'
      },
      {
        title: 'Zbieraj Collectible Cards',
        text: 'Do każdego utworu istnieją karty kolekcjonerskie. Im aktywniej działasz, tym rzadsze karty — i tym wyższe nagrody.'
      }
    ],
    ctaEarn: 'Odkryj Ecosystem',
  }
};

export default DFaithTranslations;
