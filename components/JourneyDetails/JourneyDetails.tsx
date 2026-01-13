'use client';
import { PregnancyWeek } from '@/types/week';
import { useState } from 'react';
import css from './JourneyDetails.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import { fetchDataByWeekNumber } from '@/lib/api/serverApi';
import { useQuery } from '@tanstack/react-query';

export default function JourneyDetails(weekNumber: number) {
  // export default function JourneyDetails({ data }: { data: PregnancyWeek }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const { data, isLoading, error } = useQuery<PregnancyWeek>({
    queryKey: ['journey', weekNumber],
    queryFn: () => fetchDataByWeekNumber(weekNumber),
    refetchOnMount: false,
  });

  return (
    <>
      <section className={css.journeyDetails}>
        <div className={css.journeyContainer}>
          <div className={css.tabContainer}>
            <button
              className={clsx(css.tabButton, selectedTab === 0 && css.active)}
              onClick={() => setSelectedTab(0)}
            >
              Розвиток малюка
            </button>

            <button
              className={clsx(css.tabButton, selectedTab === 1 && css.active)}
              onClick={() => setSelectedTab(1)}
            >
              Тіло мами
            </button>
          </div>

          {selectedTab === 0 && data ? (
            /* Розвиток малюка */
            <div className={css.babyContent}>
              <div className={css.babyContentLeft}>
                <div className={css.babyImageWrapper}>
                  <Image
                    src={`${data.baby.image}`}
                    alt="Baby Size Association Image"
                    className={css.babyImage}
                  />
                </div>
                <p className={css.babyAnalogy}>
                  Ваш малюк розміром як {data.baby.analogy}
                </p>
              </div>
              <div className={css.babyJourneyInfo}>
                <div className={css.babyActivityDevelopment}>
                  <p className={css.babyActivityDevelopment}>
                    {data.baby.babyActivity}
                  </p>
                  <p className={css.babyActivityDevelopment}>
                    {data.baby.babyDevelopment}
                  </p>
                </div>
                <div className={css.babyInterestFact}>
                  <div className={css.babyInterestFactTitle}>
                    <svg
                      className={css.babyInterestFactLogo}
                      width="24"
                      height="24"
                    >
                      <use href="/img/journey/journey-sprite.svg#icon-star_shine"></use>
                    </svg>
                    <h4>Цікавий факт тижня</h4>
                  </div>
                  <p className={css.babyInterestFactContent}>
                    {data.baby.interestingFact}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Тіло мами */
            <div className={css.momContent}>
              <div className={css.momContentLeft}>
                <div className={css.fillingsBlock}>
                  <h3 className={css.feelingsTitle}>Як ви можете почуватись</h3>
                  <ul className={css.feelingsList}>
                    {data?.mom.feelings.states.map((state, index) => (
                      <li key={index} className={css.fillingsItem}>
                        {state}
                      </li>
                    ))}
                  </ul>
                  <p className={css.sensationDescription}>
                    {data?.mom.feelings.sensationDescr}
                  </p>
                </div>
                <div className={css.comfortBlock}>
                  <h3 className={css.feelingsTitle}>
                    Поради для вашого комфорту
                  </h3>
                  <ul className={css.comfortList}>
                    {data?.mom.comfortTips.map((tip) => (
                      <li key={tip._id} className={css.adviceComfortItem}>
                        <div className={css.adviceComfortTitle}>
                          <svg
                            className={css.babyInterestFactLogo}
                            width="24"
                            height="24"
                          >
                            <use href="./journey-sprite.svg#fork_spoon"></use>
                          </svg>
                          <h5>{tip.category}</h5>
                        </div>
                        <p>{tip.tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={css.tasksComponent}>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                  recusandae asperiores aut ut consectetur dolores consequuntur
                  iure temporibus ducimus dolor voluptas voluptates numquam
                  quam, reprehenderit labore sequi esse quaerat non.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
