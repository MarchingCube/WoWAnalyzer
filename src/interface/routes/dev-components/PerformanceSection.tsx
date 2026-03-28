import PerformanceBar from 'parser/ui/PerformanceBar';
import GradiatedPerformanceBar from 'interface/guide/components/GradiatedPerformanceBar';
import PassFailBar from 'interface/guide/components/PassFailBar';
import { PerformanceMark, PassFailCheckmark } from 'interface/guide';
import { QualitativePerformance } from 'parser/ui/QualitativePerformance';
import { ShowcaseItem, CategoryTitle, Row } from './shared';

export default function PerformanceSection() {
  return (
    <>
      <CategoryTitle>Performance</CategoryTitle>

      <ShowcaseItem
        id="performance-mark"
        title="PerformanceMark"
        description={
          <>
            Shows a glyph based on <code>QualitativePerformance</code> enum. Used in checklists and
            guide sections.
          </>
        }
        sourcePath="interface/guide"
        code={`import { PerformanceMark } from 'interface/guide';
import { QualitativePerformance } from 'parser/ui/QualitativePerformance';

<PerformanceMark perf={QualitativePerformance.Good} />`}
      >
        <Row>
          <span>
            Perfect: <PerformanceMark perf={QualitativePerformance.Perfect} />
          </span>
          <span>
            Good: <PerformanceMark perf={QualitativePerformance.Good} />
          </span>
          <span>
            Ok: <PerformanceMark perf={QualitativePerformance.Ok} />
          </span>
          <span>
            Fail: <PerformanceMark perf={QualitativePerformance.Fail} />
          </span>
        </Row>
      </ShowcaseItem>

      <ShowcaseItem
        id="pass-fail-checkmark"
        title="PassFailCheckmark"
        description="Simple binary green checkmark or red X."
        sourcePath="interface/guide"
        code={`import { PassFailCheckmark } from 'interface/guide';

<PassFailCheckmark pass={true} />`}
      >
        <Row>
          <span>
            Pass: <PassFailCheckmark pass />
          </span>
          <span>
            Fail: <PassFailCheckmark pass={false} />
          </span>
        </Row>
      </ShowcaseItem>

      <ShowcaseItem
        id="performance-bar"
        title="PerformanceBar"
        description="Color gradient bar (red to green) based on 0-1 value."
        sourcePath="parser/ui/PerformanceBar"
        code={`<PerformanceBar percent={0.85} />`}
      >
        {[0.2, 0.5, 0.75, 0.95].map((v) => (
          <div key={v}>
            <small>{Math.round(v * 100)}%</small>
            <PerformanceBar percent={v} />
          </div>
        ))}
      </ShowcaseItem>

      <ShowcaseItem
        id="gradiated-performance-bar"
        title="GradiatedPerformanceBar"
        description="Shows distribution across Perfect/Good/Ok/Bad segments."
        sourcePath="interface/guide/components/GradiatedPerformanceBar"
        code={`<GradiatedPerformanceBar perfect={12} good={8} ok={3} bad={1} />`}
      >
        <GradiatedPerformanceBar perfect={12} good={8} ok={3} bad={1} />
      </ShowcaseItem>

      <ShowcaseItem
        id="pass-fail-bar"
        title="PassFailBar"
        description="Binary pass/fail bar."
        sourcePath="interface/guide/components/PassFailBar"
        code={`<PassFailBar pass={18} total={22} />`}
      >
        <PassFailBar pass={18} total={22} />
      </ShowcaseItem>
    </>
  );
}
