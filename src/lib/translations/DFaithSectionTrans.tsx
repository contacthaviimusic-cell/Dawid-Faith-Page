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
        text: 'Kommentiere, like oder teile Inhalte auf YouTube, Instagram, TikTok & Co. und sammle Tokens im D.FAITH Ecosystem — jederzeit umwandelbar in Solana.'
      },
      {
        title: 'Exklusive Inhalte kaufen',
        text: 'Mit deinen Tokens kaufst du limitierte Songs, Videos und exklusive Inhalte direkt von Dawid Faith — als nummerierte NFTs in deinem eigenen Wallet.'
      },
      {
        title: 'Collectible Cards sammeln',
        text: 'Zu jedem Song gibt es eigene Collectible Cards mit Seltenheitscharakter. Je aktiver du im Ecosystem bist, desto seltener die Karten, die du bekommst — seltene Karten bringen dir dauerhaft höhere Belohnungen.'
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
        text: 'Comment, like or share content on YouTube, Instagram, TikTok & more, and collect Tokens in the D.FAITH Ecosystem — convertible into Solana at any time.'
      },
      {
        title: 'Buy exclusive content',
        text: 'Use your Tokens to buy limited songs, videos and exclusive content directly from Dawid Faith — as numbered NFTs in your own wallet.'
      },
      {
        title: 'Collect Collectible Cards',
        text: 'Every song has its own Collectible Cards with a rarity factor. The more active you are in the Ecosystem, the rarer the cards you receive — rare cards give you permanently higher rewards.'
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
        text: 'Komentuj, polub lub udostępniaj treści na YouTube, Instagramie, TikToku i innych, i zbieraj Tokeny w D.FAITH Ecosystem — wymienialne w każdej chwili na Solana.'
      },
      {
        title: 'Kupuj ekskluzywne treści',
        text: 'Za swoje Tokeny kupujesz limitowane utwory, filmy i ekskluzywne treści bezpośrednio od Dawida Faith — jako ponumerowane NFT w swoim własnym portfelu.'
      },
      {
        title: 'Zbieraj Collectible Cards',
        text: 'Do każdego utworu istnieją własne Collectible Cards o zróżnicowanej rzadkości. Im bardziej jesteś aktywny w Ecosystem, tym rzadsze karty otrzymujesz — rzadkie karty dają trwale wyższe nagrody.'
      }
    ],
    ctaEarn: 'Odkryj Ecosystem',
  }
};

export default DFaithTranslations;
