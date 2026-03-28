import UptimeBar from 'parser/ui/UptimeBar';
import UptimeStackBar from 'parser/ui/UptimeStackBar';
import { ShowcaseItem, CategoryTitle } from './shared';

const now = Date.now();
const fightStart = now - 300000;
const fightEnd = now;

export default function TimelineSection() {
  return (
    <>
      <CategoryTitle>Timeline</CategoryTitle>

      <ShowcaseItem
        id="uptime-bar"
        title="UptimeBar"
        description="Shows buff/debuff uptime periods on a timeline."
        sourcePath="parser/ui/UptimeBar"
        code={`<UptimeBar
  uptimeHistory={[{ start: 1000, end: 5000 }, ...]}
  start={fightStart}
  end={fightEnd}
  barColor="#f8b700"
/>`}
      >
        <div style={{ height: 24 }}>
          <UptimeBar
            uptimeHistory={[
              { start: fightStart, end: fightStart + 20000 },
              { start: fightStart + 45000, end: fightStart + 65000 },
              { start: fightStart + 90000, end: fightStart + 130000 },
              { start: fightStart + 180000, end: fightStart + 210000 },
              { start: fightStart + 250000, end: fightStart + 290000 },
            ]}
            start={fightStart}
            end={fightEnd}
          />
        </div>
      </ShowcaseItem>

      <ShowcaseItem
        id="uptime-stack-bar"
        title="UptimeStackBar"
        description="Height represents stack count."
        sourcePath="parser/ui/UptimeStackBar"
        code={`<UptimeStackBar
  stackUptimeHistory={[{ start, end, stacks: 2 }, ...]}
  start={fightStart}
  end={fightEnd}
  maxStacks={3}
/>`}
      >
        <div style={{ height: 30 }}>
          <UptimeStackBar
            stackUptimeHistory={[
              { start: fightStart, end: fightStart + 15000, stacks: 1 },
              { start: fightStart + 15000, end: fightStart + 30000, stacks: 2 },
              { start: fightStart + 30000, end: fightStart + 40000, stacks: 3 },
              { start: fightStart + 60000, end: fightStart + 80000, stacks: 1 },
              { start: fightStart + 80000, end: fightStart + 100000, stacks: 2 },
              { start: fightStart + 150000, end: fightStart + 180000, stacks: 3 },
              { start: fightStart + 180000, end: fightStart + 200000, stacks: 2 },
              { start: fightStart + 200000, end: fightStart + 210000, stacks: 1 },
            ]}
            start={fightStart}
            end={fightEnd}
            maxStacks={3}
          />
        </div>
      </ShowcaseItem>
    </>
  );
}
