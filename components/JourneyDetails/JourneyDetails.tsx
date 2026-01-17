'use client';
import { PregnancyWeek } from '@/types/week';
import { useState } from 'react';
import css from './JourneyDetails.module.css';
import clsx from 'clsx';
import Image from 'next/image';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';
import AddTaskModal from '../AddTaskModal/AddTaskModal';

const CATEGORY_ICONS: Record<string, string> = {
  Харчування: 'fork_spoon',
  Активність: 'fitness_center',
  'Відпочинок та комфорт': 'chair',
};

export default function JourneyDetails({ data }: { data: PregnancyWeek }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const page = 'journeyPage';

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  function openAddTaskModal(): void {
    setIsAddTaskModalOpen(true);
  }

  function closeAddTaskModal(): void {
    setIsAddTaskModalOpen(false);
  }
  return (
    <>
      <section>
        <div className={clsx(css.journeyContainer, css.container)}>
          <div
            className={clsx(
              css.tabContainer,
              selectedTab === 1 && css.slideRight,
            )}
          >
            <div className={css.tabIndicator} />
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

          {selectedTab === 0 ? (
            /* Розвиток малюка */
            <div className={css.babyContent}>
              <div className={css.babyContentLeft}>
                <div className={css.babyImageWrapper}>
                  <Image
                    src={data.baby.image}
                    alt="Baby Size Association Image"
                    className={css.babyImage}
                    width={461}
                    height={379}
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                {data.baby.analogy && (
                  <p className={css.babyAnalogy}>
                    Ваш малюк розміром як {data.baby.analogy}
                  </p>
                )}
              </div>
              <div className={css.babyJourneyInfo}>
                <div className={css.babyActivityDevelopment}>
                  <p className={css.babyActivityDevelopmentText}>
                    {data.baby.babyActivity}
                  </p>
                  <p className={css.babyActivityDevelopmentText}>
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
                      <use href="/img/journey/journey-sprite.svg#star_shine"></use>
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
                    {data.mom.feelings.states.map((state, index) => (
                      <li
                        key={`${state}-${index}`}
                        className={css.fillingsItem}
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                  <p className={css.sensationDescription}>
                    {data.mom.feelings.sensationDescr}
                  </p>
                </div>
                <div className={css.comfortBlock}>
                  <h3 className={css.feelingsTitle}>
                    Поради для вашого комфорту
                  </h3>
                  <ul className={css.comfortList}>
                    {data.mom.comfortTips.map((tip) => (
                      <li key={tip._id} className={css.adviceComfortItem}>
                        <div className={css.adviceComfortTitle}>
                          <svg
                            className={css.babyInterestFactLogo}
                            width="24"
                            height="24"
                          >
                            <use
                              href={`/img/journey/journey-sprite.svg#${CATEGORY_ICONS[tip.category]}`}
                            ></use>
                          </svg>
                          <h5>{tip.category}</h5>
                        </div>
                        <p className={css.adviceComfortContent}>{tip.tip}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={css.tasksComponent}>
                <TasksReminderCard
                  page={page}
                  openAddTaskModal={openAddTaskModal}
                />
              </div>
              {isAddTaskModalOpen && (
                <AddTaskModal onClose={closeAddTaskModal} />
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
