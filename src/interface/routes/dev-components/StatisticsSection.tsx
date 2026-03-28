import { useState } from 'react';
import Statistic from 'parser/ui/Statistic';
import STATISTIC_CATEGORY from 'parser/ui/STATISTIC_CATEGORY';
import STATISTIC_ORDER from 'parser/ui/STATISTIC_ORDER';
import BoringValueText from 'parser/ui/BoringValueText';
import DonutChart from 'parser/ui/DonutChart';
import Gauge from 'parser/ui/Gauge';
import TalentAggregateStatistic from 'parser/ui/TalentAggregateStatistic';
import { ShowcaseItem, CategoryTitle, ComponentTitle, Demo, Row } from './shared';

function GaugeDemo() {
  const [value, setValue] = useState(0.73);
  return (
    <Row>
      <Gauge value={value} />
      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={value * 100}
          onChange={(e) => setValue(Number(e.target.value) / 100)}
        />
        <div>{Math.round(value * 100)}%</div>
      </div>
    </Row>
  );
}

export default function StatisticsSection() {
  return (
    <>
      <CategoryTitle>Statistics</CategoryTitle>

      <ShowcaseItem
        id="statistic"
        title="Statistic"
        description={
          <>
            Main container for analyzer statistics. Use <code>BoringSpellValueText</code> or{' '}
            <code>BoringValueText</code> inside.
          </>
        }
        sourcePath="parser/ui/Statistic"
        code={`<Statistic position={STATISTIC_ORDER.OPTIONAL(1)} size="flexible" category={STATISTIC_CATEGORY.GENERAL} tooltip="...">
  <BoringSpellValueText spell={SPELLS.MY_SPELL}>
    <ItemDamageDone amount={totalDamage} />
  </BoringSpellValueText>
</Statistic>`}
      >
        <Statistic
          position={STATISTIC_ORDER.OPTIONAL(1)}
          size="flexible"
          category={STATISTIC_CATEGORY.GENERAL}
          tooltip="This is a tooltip"
        >
          <BoringValueText
            label={
              <>
                <img
                  alt="Damage"
                  src="/img/sword.png"
                  style={{ height: '1.2em', verticalAlign: 'middle' }}
                />{' '}
                Example Statistic
              </>
            }
          >
            <div>42.5k DPS</div>
            <div>
              <small>85% of total</small>
            </div>
          </BoringValueText>
        </Statistic>
      </ShowcaseItem>

      <ShowcaseItem
        id="donut-chart"
        title="DonutChart"
        description={
          <>
            Shows proportional breakdown with legend. SpellLinks via <code>spellId</code> prop.
          </>
        }
        sourcePath="parser/ui/DonutChart"
        code={`<DonutChart items={[
  { color: '#8b5cf6', label: 'Spell A', spellId: SPELLS.A.id, value: 150000, valueTooltip: '...' },
  { color: '#22c55e', label: 'Spell B', value: 85000, valuePercent: false },
]} />`}
      >
        <div style={{ maxWidth: 300 }}>
          <DonutChart
            items={[
              {
                color: '#8b5cf6',
                label: 'Necrotic Coil',
                value: 150000,
                valueTooltip: '15,000 DPS',
              },
              { color: '#22c55e', label: 'Graveyard', value: 85000, valueTooltip: '8,500 DPS' },
              { color: '#ef4444', label: 'Other', value: 35000, valueTooltip: '3,500 DPS' },
            ]}
          />
        </div>
        <Demo>
          <ComponentTitle>With raw values (no tooltip)</ComponentTitle>
          <div style={{ maxWidth: 300 }}>
            <DonutChart
              items={[
                { color: '#22c55e', label: 'Consumed', value: 45, valuePercent: false },
                { color: '#ef4444', label: 'Expired', value: 3, valuePercent: false },
                { color: '#f59e0b', label: 'Overwritten', value: 8, valuePercent: false },
              ]}
            />
          </div>
        </Demo>
      </ShowcaseItem>

      <ShowcaseItem
        id="gauge"
        title="Gauge"
        description="Semicircular gauge showing a 0-1 value."
        sourcePath="parser/ui/Gauge"
        code={`<Gauge value={0.73} />`}
      >
        <GaugeDemo />
      </ShowcaseItem>

      <ShowcaseItem
        id="talent-aggregate"
        title="TalentAggregateStatistic"
        description="Horizontal bars showing per-spell contribution with optional sub-bars."
        sourcePath="parser/ui/TalentAggregateStatistic"
        code={`<TalentAggregateStatistic bars={[
  { spell: SPELLS.MY_SPELL, amount: 250000, color: '#8b5cf6',
    subSpecs: [{ spell: SPELLS.SUB, amount: 180000, color: '#a78bfa' }] },
]} />`}
      >
        <TalentAggregateStatistic
          bars={[
            {
              spell: { id: 1, name: 'Necrotic Coil', icon: 'spell_animamaldraxxus_missile' },
              amount: 250000,
              color: '#8b5cf6',
              subSpecs: [
                {
                  spell: { id: 2, name: 'Hit', icon: 'spell_animamaldraxxus_missile' },
                  amount: 180000,
                  color: '#a78bfa',
                },
                {
                  spell: { id: 3, name: 'Pierce', icon: 'spell_animamaldraxxus_missile' },
                  amount: 70000,
                  color: '#6d28d9',
                },
              ],
            },
            {
              spell: { id: 4, name: 'Graveyard', icon: 'spell_necro_deathall' },
              amount: 180000,
              color: '#22c55e',
            },
            {
              spell: { id: 5, name: 'Death Coil', icon: 'spell_shadow_deathcoil' },
              amount: 120000,
              color: '#3b82f6',
            },
          ]}
        />
      </ShowcaseItem>
    </>
  );
}
