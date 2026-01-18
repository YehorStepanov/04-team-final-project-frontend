'use client';

import { useState } from 'react';
import css from './MomTipCard.module.css';

interface ComfortTip {
  _id: string;
  category: string;
  tip?: string;
}

interface MomTipCardProps {
  mom: {
    comfortTips: ComfortTip[];
  };
}

function MomTipCard({ mom }: MomTipCardProps) {
  const [randomIndex] = useState(() => {
    if (!mom?.comfortTips?.length) return 0;
    return Math.floor(Math.random() * mom.comfortTips.length);
  });

  const tip = mom.comfortTips[randomIndex];

  if (!tip) return null;

  return (
    <section className={css.momTipCard}>
      <h2 className={css.momTipCard__title}>Порада для мами</h2>
      <p className={css.momTipCard__paragraph}>{tip?.tip}</p>
    </section>
  );
}

export default MomTipCard;
