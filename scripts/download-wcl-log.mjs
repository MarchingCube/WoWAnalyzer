#!/usr/bin/env node

/**
 * Downloads a WCL log via the WoWAnalyzer proxy and combines all data into a single JSON file.
 *
 * Usage:
 *   node scripts/download-wcl-log.mjs <report-url-or-code> [--fight <id>] [--out <file>]
 *
 * Examples:
 *   node scripts/download-wcl-log.mjs https://www.warcraftlogs.com/reports/RgH3wjBdvynZDL7C?fight=7
 *   node scripts/download-wcl-log.mjs RgH3wjBdvynZDL7C --fight 7
 *   node scripts/download-wcl-log.mjs RgH3wjBdvynZDL7C --fight 7 --out my-log.json
 */

const PROXY_BASE = 'https://wowanalyzer.com/i/v1';

function parseArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node scripts/download-wcl-log.mjs <report-url-or-code> [--fight <id>] [--out <file>]');
    process.exit(1);
  }

  let reportCode = null;
  let fightId = null;
  let outFile = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--fight') {
      fightId = parseInt(args[++i], 10);
    } else if (args[i] === '--out') {
      outFile = args[++i];
    } else if (!reportCode) {
      // Parse URL or bare code
      const urlMatch = args[i].match(/reports\/([A-Za-z0-9]+)/);
      if (urlMatch) {
        reportCode = urlMatch[1];
        // Also try to extract fight from URL query
        const fightMatch = args[i].match(/[?&]fight=(\d+)/);
        if (fightMatch && fightId === null) {
          fightId = parseInt(fightMatch[1], 10);
        }
      } else {
        reportCode = args[i];
      }
    }
  }

  if (!reportCode) {
    console.error('Error: Could not determine report code.');
    process.exit(1);
  }
  if (fightId === null) {
    console.error('Error: No fight ID specified. Use --fight <id> or include ?fight=<id> in the URL.');
    process.exit(1);
  }

  return { reportCode, fightId, outFile };
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status} fetching ${url}: ${text}`);
  }
  return response.json();
}

async function fetchFights(reportCode) {
  console.log(`Fetching fights for report ${reportCode}...`);
  const url = `${PROXY_BASE}/report/fights/${reportCode}?translate=true`;
  return fetchJson(url);
}

async function fetchEventsPage(reportCode, start, end, filter) {
  const params = new URLSearchParams({
    start: String(start),
    end: String(end),
    translate: 'true',
  });
  if (filter) {
    params.set('filter', filter);
  }
  const url = `${PROXY_BASE}/report/events/${reportCode}?${params}`;
  return fetchJson(url);
}

async function fetchAllEvents(reportCode, start, end, filter, label) {
  let pageStart = start;
  let allEvents = [];
  let page = 0;
  const MAX_PAGES = 100;

  while (true) {
    process.stdout.write(`  Fetching ${label || 'events'} page ${page + 1} (from ${pageStart})...`);
    const json = await fetchEventsPage(reportCode, pageStart, end, filter);
    const events = json.events || [];
    allEvents = allEvents.concat(events);
    console.log(` got ${events.length} events`);

    if (json.nextPageTimestamp) {
      pageStart = json.nextPageTimestamp;
      page++;
      if (page >= MAX_PAGES) {
        console.warn(`  Warning: hit max pages (${MAX_PAGES}), some events may be missing.`);
        break;
      }
    } else {
      break;
    }
  }

  return allEvents;
}

async function main() {
  const { reportCode, fightId, outFile } = parseArgs();

  // 1. Fetch fights/report metadata
  const fightsData = await fetchFights(reportCode);

  const fight = fightsData.fights?.find((f) => f.id === fightId);
  if (!fight) {
    console.error(`Error: Fight ${fightId} not found in report. Available fights:`);
    for (const f of fightsData.fights || []) {
      console.error(`  ${f.id}: ${f.name} (${f.kill ? 'Kill' : 'Wipe'}) - ${f.start_time}..${f.end_time}`);
    }
    process.exit(1);
  }

  console.log(`Found fight ${fightId}: ${fight.name} (${fight.kill ? 'Kill' : 'Wipe'})`);
  const start = fight.start_time;
  const end = fight.end_time;

  // 2. Fetch all events and combatant info in parallel
  console.log(`Fetching all events for fight ${fightId} (${start} - ${end})...`);

  const [allEvents, combatantEvents] = await Promise.all([
    fetchAllEvents(reportCode, start, end, null, 'combat events'),
    fetchAllEvents(reportCode, start, end, 'type="combatantinfo"', 'combatant info'),
  ]);

  console.log(`\nTotal combat events: ${allEvents.length}`);
  console.log(`Total combatant info events: ${combatantEvents.length}`);

  // 3. Combine into a single output
  const output = {
    reportCode,
    fightId,
    report: fightsData,
    fight,
    combatants: combatantEvents,
    events: allEvents,
  };

  const fileName = outFile || `wcl-${reportCode}-fight${fightId}.json`;
  const { writeFileSync } = await import('node:fs');
  writeFileSync(fileName, JSON.stringify(output, null, 2));
  console.log(`\nWritten to ${fileName} (${(JSON.stringify(output).length / 1024 / 1024).toFixed(1)} MB)`);
}

main().catch((err) => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
