import styled from '@emotion/styled';
import * as design from 'interface/design-system';
import { Description } from './dev-components/shared';
import PerformanceSection from './dev-components/PerformanceSection';
import StatisticsSection from './dev-components/StatisticsSection';
import TimelineSection from './dev-components/TimelineSection';
import GuideSection from './dev-components/GuideSection';

const Page = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: ${design.colors.bodyText};
  display: flex;
  gap: ${design.gaps.large};
`;

const Sidebar = styled.nav`
  position: sticky;
  top: 20px;
  align-self: flex-start;
  min-width: 180px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: ${design.gaps.small};
  background: ${design.level1.background};
  border: 1px solid ${design.level1.border};
  border-radius: 4px;

  h3 {
    color: ${design.colors.wowaYellow};
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 12px 0 4px;
    &:first-of-type {
      margin-top: 0;
    }
  }

  a {
    display: block;
    padding: 3px 8px;
    color: ${design.colors.unfocusedText};
    text-decoration: none;
    font-size: 13px;
    border-radius: 3px;
    &:hover {
      color: ${design.colors.bodyText};
      background: ${design.level2.background};
    }
  }
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
`;

export function Component() {
  return (
    <Page>
      <Sidebar>
        <h3>Performance</h3>
        <a href="#performance-mark">PerformanceMark</a>
        <a href="#pass-fail-checkmark">PassFailCheckmark</a>
        <a href="#performance-bar">PerformanceBar</a>
        <a href="#gradiated-performance-bar">GradiatedPerformanceBar</a>
        <a href="#pass-fail-bar">PassFailBar</a>
        <h3>Statistics</h3>
        <a href="#statistic">Statistic</a>
        <a href="#donut-chart">DonutChart</a>
        <a href="#gauge">Gauge</a>
        <a href="#talent-aggregate">TalentAggregateStatistic</a>
        <h3>Timeline</h3>
        <a href="#uptime-bar">UptimeBar</a>
        <a href="#uptime-stack-bar">UptimeStackBar</a>
        <h3>Guide</h3>
        <a href="#stacked-bar">StackedBar</a>
        <a href="#cooldown-grid">CooldownGrid</a>
        <a href="#cast-efficiency-bar">CastEfficiencyBar</a>
        <a href="#cooldown-bar">CooldownBar</a>
        <a href="#cooldown-graph-subsection">CooldownGraphSubSection</a>
        <a href="#embedded-timeline">EmbeddedTimeline</a>
        <a href="#throughput-table">ThroughputTable</a>
        <a href="#buff-uptime-bar">BuffUptimeBar</a>
      </Sidebar>
      <Content>
        <h1>Component Showcase</h1>
        <Description>
          Dev-only page. Available at <code>/dev/components</code> in development mode.
        </Description>
        <PerformanceSection />
        <StatisticsSection />
        <TimelineSection />
        <GuideSection />
      </Content>
    </Page>
  );
}
