import StackedBar from 'interface/guide/components/StackedBar';
import { ShowcaseItem, CategoryTitle } from './shared';

export default function GuideSection() {
  return (
    <>
      <CategoryTitle>Guide Components</CategoryTitle>

      <ShowcaseItem
        id="stacked-bar"
        title="StackedBar"
        description="Generic proportional stacked bar with legend and tooltips."
        sourcePath="interface/guide/components/StackedBar"
        code={`<StackedBar segments={[
  { label: 'Spell A', value: 150000, color: '#8b5cf6', tooltip: '...' },
  { label: 'Spell B', value: 85000, color: '#22c55e' },
]} />`}
      >
        <StackedBar
          segments={[
            { label: 'Necrotic Coil', value: 150000, color: '#8b5cf6', tooltip: '150,000 damage' },
            { label: 'Graveyard', value: 85000, color: '#22c55e', tooltip: '85,000 damage' },
            { label: 'Death Coil', value: 120000, color: '#3b82f6', tooltip: '120,000 damage' },
            { label: 'Epidemic', value: 45000, color: '#f59e0b', tooltip: '45,000 damage' },
          ]}
        />
      </ShowcaseItem>

      <ShowcaseItem
        id="cooldown-grid"
        title="CooldownGrid"
        description="Grid display of cooldown/buff windows with per-window checklist, embedded timeline, and damage table. Used for major cooldown analysis (e.g., Invoke Niuzao, Forbidden Knowledge)."
        reportOnly
        sourcePath="interface/CooldownGrid/CooldownGrid"
        code={`import CooldownGrid from 'interface/CooldownGrid/CooldownGrid';

<CooldownGrid
  label={<SpellLink spell={SPELLS.MY_BUFF} />}
  timeline={{
    auras: [SPELLS.SOME_BUFF],
    cooldowns: [SPELLS.SPELL_A],
  }}
  table={{ type: EventType.Damage }}
  items={windows.map(win => ({
    perf: QualitativePerformance.Good,
    checklistItems: [
      { label: <>Casts</>, details: <>5</>, result: <PerformanceMark perf={Good} /> },
    ],
    range: { start: win.start, end: win.end },
  }))}
/>`}
      />

      <ShowcaseItem
        id="cast-efficiency-bar"
        title="CastEfficiencyBar"
        description="Spell icon + cast efficiency percentage + cooldown timeline bar combined. The most common cooldown display in guides. Supports activeWindows for execute-style spells."
        reportOnly
        sourcePath="parser/ui/CastEfficiencyBar"
        code={`import CastEfficiencyBar from 'parser/ui/CastEfficiencyBar';
import { GapHighlight } from 'parser/ui/CooldownBar';

<CastEfficiencyBar
  spell={SPELLS.MY_SPELL}
  gapHighlightMode={GapHighlight.FullCooldown}
  useThresholds
  activeWindows={[{ startTime, endTime }]}  // optional
/>`}
      />

      <ShowcaseItem
        id="cooldown-bar"
        title="CooldownBar"
        description="Timeline showing spell availability (grey) vs cooldown (yellow) with cast icons. Requires SpellUsable tracking. Three gap highlight modes: None, FullCooldown, All."
        reportOnly
        sourcePath="parser/ui/CooldownBar"
        code={`import { CooldownBar, GapHighlight } from 'parser/ui/CooldownBar';

<CooldownBar
  spellId={SPELLS.MY_SPELL.id}
  gapHighlightMode={GapHighlight.FullCooldown}
  activeWindows={[{ startTime, endTime }]}
/>`}
      />

      <ShowcaseItem
        id="cooldown-graph-subsection"
        title="CooldownGraphSubSection"
        description="Standard guide component showing multiple cooldowns with cast efficiency bars. Simple interface but does not support activeWindows."
        reportOnly
        sourcePath="interface/guide/components/CooldownGraphSubSection"
        code={`import CooldownGraphSubSection, { Cooldown } from 'interface/guide/components/CooldownGraphSubSection';

const COOLDOWNS: Cooldown[] = [
  { spell: TALENTS.MY_COOLDOWN, isActive: (c) => c.hasTalent(TALENTS.MY_COOLDOWN) },
];

<CooldownGraphSubSection cooldowns={COOLDOWNS} />`}
      />

      <ShowcaseItem
        id="embedded-timeline"
        title="EmbeddedTimeline"
        description="Full fight timeline showing casts, cooldown bars, and buff auras within a time range. Auto-sizes to container width. Used inside CooldownGrid or standalone in guide sections."
        reportOnly
        sourcePath="interface/report/Results/Timeline/EmbeddedTimeline"
        code={`import EmbeddedTimeline from 'interface/report/Results/Timeline/EmbeddedTimeline';

<EmbeddedTimeline
  range={{ start, end }}
  auras={[SPELLS.BUFF_A]}       // or true for all, false for none
  cooldowns={[SPELLS.SPELL_A]}  // cooldown bars to show
  cooldownOrder="fixed"
  cooldownLegend={false}
  overlapOffGcds
/>`}
      />

      <ShowcaseItem
        id="throughput-table"
        title="ThroughputTable"
        description="Damage or healing breakdown table for a time range. Shows ability name, amount, DPS/HPS, and percentage with colored bars."
        reportOnly
        sourcePath="interface/Table/ThroughputTable"
        code={`import ThroughputTable from 'interface/Table/ThroughputTable';
import { EventType } from 'parser/core/Events';

<ThroughputTable
  range={{ start, end }}
  type={EventType.Damage}
  abilityFilter={[SPELLS.A, SPELLS.B]}  // optional
  omitOtherRow={true}                    // optional
/>`}
      />

      <ShowcaseItem
        id="buff-uptime-bar"
        title="BuffUptimeBar"
        description="Comprehensive buff display with uptime timeline bar, uptime percentage, and average stacks. Supports stacking buffs via maxStacks prop."
        reportOnly
        sourcePath="interface/guide/components/BuffUptimeBar"
        code={`import BuffUptimeBar from 'interface/guide/components/BuffUptimeBar';

<BuffUptimeBar
  spell={SPELLS.MY_BUFF}
  buffHistory={selectedCombatant.getBuffHistory(SPELLS.MY_BUFF.id)}
  startTime={fightStart}
  endTime={fightEnd}
  maxStacks={3}  // optional
/>`}
      />
    </>
  );
}
