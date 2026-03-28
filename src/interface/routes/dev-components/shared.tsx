import styled from '@emotion/styled';
import * as design from 'interface/design-system';
import React from 'react';

const SectionStyled = styled.section`
  margin-bottom: 40px;
  scroll-margin-top: 20px;
`;

const SectionTitleStyled = styled.h2`
  border-bottom: 1px solid ${design.level1.border};
  padding-bottom: 8px;
  margin-bottom: 16px;
  color: ${design.colors.bodyText};

  a {
    color: inherit;
    text-decoration: none;
    &::after {
      content: ' #';
      font-size: 0.7em;
      opacity: 0;
    }
    &:hover {
      color: ${design.colors.wowaYellow};
      &::after {
        opacity: 0.5;
      }
    }
  }
`;

export function ShowcaseItem({
  id,
  title,
  description,
  sourcePath,
  code,
  reportOnly,
  children,
}: {
  id: string;
  title: string;
  description: React.ReactNode;
  sourcePath: string;
  code: string;
  reportOnly?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <SectionStyled id={id}>
      <SectionTitleStyled>
        <a href={`#${id}`}>{title}</a>
      </SectionTitleStyled>
      <Description>{description}</Description>
      {reportOnly && <ReportOnlyNote />}
      {children && <Demo>{children}</Demo>}
      <SourcePath>{sourcePath}</SourcePath>
      <CodeBlock>{code}</CodeBlock>
    </SectionStyled>
  );
}

export const CategoryTitle = styled.h2`
  color: ${design.colors.wowaYellow};
  font-size: ${design.fontSize.heading};
  margin: 32px 0 16px;
  &:first-of-type {
    margin-top: 0;
  }
`;

export const ComponentTitle = styled.h3`
  color: ${design.colors.unfocusedText};
  margin: 16px 0 8px;
`;

export const Description = styled.p`
  color: ${design.colors.unfocusedText};
  font-size: 14px;
  margin-bottom: 12px;
`;

export const CodeBlock = styled.pre`
  background: ${design.level0.background};
  border: 1px solid ${design.level1.border};
  border-radius: 4px;
  padding: 12px;
  font-size: 12px;
  overflow-x: auto;
  margin-bottom: 16px;
  color: ${design.colors.unfocusedText};
`;

export const Demo = styled.div`
  background: ${design.level1.background};
  border: 1px solid ${design.level1.border};
  box-shadow: ${design.level1.shadow};
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const ReportOnlyNote = styled.div`
  background: ${design.level1.background};
  border: 1px solid ${design.level1.border};
  border-left: 3px solid ${design.colors.wowaYellow};
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 13px;
  color: ${design.colors.unfocusedText};
  &::before {
    content: 'Requires report context (useInfo/useAnalyzer hooks). View in a loaded report.';
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
`;

export const SourcePath = styled.div`
  font-size: 13px;
  color: ${design.colors.wowaYellow};
  font-family: monospace;
  margin-bottom: 8px;
  &::before {
    content: 'Source: ';
    color: ${design.colors.unfocusedText};
    font-family: inherit;
  }
`;
