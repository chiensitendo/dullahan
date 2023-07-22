import { Timeline } from "@/type";
import React, { useMemo } from "react";

const DebtTimeline = ({ items }: { items: Timeline[] }) => {
  const TimelineYear = ({ isTop, year }: { isTop: boolean; year: string }) => {
    return (
      <React.Fragment>
        <div className="timeline-space"></div>

        <div className={`timeline-year ${isTop ? "timeline-border-top" : ""}`}>
          <div className="timeline-stroke"></div>
          {year}
          <div className="timeline-stroke"></div>
        </div>

        <div className="timeline-space"></div>
      </React.Fragment>
    );
  };

  const TimelineLeft = ({
    month,
    year,
    desc,
    event,
    isFinal,
  }: {
    month: string;
    year: string;
    desc: string;
    event: string;
    isFinal: boolean;
  }) => {
    return (
      <React.Fragment>
        <div
          className="timeline-left"
          style={{ paddingBottom: isFinal ? "5.5rem" : undefined }}
        >
          <div className="itemline-left-1">
            <h4>{event}</h4>
            <p>{desc}</p>
          </div>
          <div className="itemline-left-2">
            <p>{month}</p>
            <p>{year}</p>
          </div>
        </div>
        <div className="timeline-space timeline-middle">
          <div className="timeline-line"></div>
        </div>
        <div className="timeline-space"></div>
      </React.Fragment>
    );
  };

  const TimelineRight = ({
    month,
    year,
    desc,
    event,
    isFinal,
  }: {
    month: string;
    year: string;
    desc: string;
    event: string;
    isFinal: boolean;
  }) => {
    return (
      <React.Fragment>
        <div className="timeline-space"></div>
        <div className="timeline-space timeline-middle">
          <div className="timeline-line"></div>
        </div>
        <div
          className="timeline-right"
          style={{ paddingBottom: isFinal ? "5.5rem" : undefined }}
        >
          <div className="itemline-right-1">
            <h4>{event}</h4>
            <p>{desc}</p>
          </div>
          <div className="itemline-right-2">
            <p>{month}</p>
            <p>{year}</p>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const list = useMemo(() => {
    const l: any[] = [];
    let isLeft = true;
    let currentYear = "";
    let count = items.filter(
      (item) => !isNaN(new Date(item.date).getDate())
    ).length;
    items
      .filter((item) => !isNaN(new Date(item.date).getDate()))
      .forEach((item, index) => {
        const [month, year] = item.date.split(" ");
        if (currentYear !== year) {
          l.push(
            <TimelineYear key={l.length} year={year} isTop={l.length === 0} />
          );
          currentYear = year;
        }
        if (isLeft) {
          isLeft = false;
          l.push(
            <TimelineLeft
              key={l.length}
              month={month}
              year={year}
              desc={item.description}
              event={item.event}
              isFinal={index === count - 1}
            />
          );
        } else {
          isLeft = true;
          l.push(
            <TimelineRight
              key={l.length}
              month={month}
              year={year}
              desc={item.description}
              event={item.event}
              isFinal={index === count - 1}
            />
          );
        }
      });
    return l;
  }, [items]);

  return (
    <div className="flex flex-col items-center justify-center px-8 pt-14 bg-black">
      <div
        className="h-container h-container-no-padding flex flex-col items-center justify-start"
        style={{ padding: "0 2rem" }}
      >
        <div className="timeline-headling">
          <p className="text-focus text-[20px] font-semibold leading-7">
            Highlight timeline
          </p>
          <p className="heading-06-05 text-white pb-4 pt-6">
            Achieve your financial goals with financial knowledge
          </p>
          <img className="w-full max-w-full" src="/images/timeline.svg" />
        </div>
        <div className="timeline-content">{list}</div>
      </div>
    </div>
  );
};

export default DebtTimeline;
