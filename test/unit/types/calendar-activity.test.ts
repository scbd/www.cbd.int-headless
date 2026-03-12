import { describe, it, expect } from 'vitest';
import type {
  CalendarDoc,
  MeetingDoc,
  NotificationDoc,
  CalendarActivityDoc,
  CalendarSearchResult,
  CalendarSearchParams,
  GroupedItem,
  ParsedFacets,
  CalendarFilterState,
  CalendarFilterOption,
} from '~/types/calendar-activity';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const baseMeeting: MeetingDoc = {
  id: 'meeting-1',
  schema: 'meeting',
  identifier: 'CBD-COP-16',
  title: { en: 'COP 16' },
  startDate: '2025-10-01',
  endDate: '2025-10-15',
  createdDate: '2025-01-01',
  status: 'confirmed',
  statusKey: 'confirmed',
  statusCOA: 'confirmed',
  url: 'https://cbd.int/cop16',
  governingBodies: ['CBD-COP'],
  subsidiaryBodies: [],
  governingBodiesCOA: ['CBD-COP'],
  subsidiaryBodiesCOA: [],
  relatedRecords: [],
  relatedMeetings: [],
  relatedActivities: [],
  actionRequired: false,
  actionRequiredByParties: false,
  actionRequiredByPartiesCOA: false,
  symbol: 'UNEP/CBD/COP/16/1',
  meetingCode: 'cop-16',
  eventCity: { en: 'Cali' },
  eventCountry: { en: 'Colombia' },
  hostGovernments: ['co'],
  themes: ['biodiversity'],
};

const baseNotification: NotificationDoc = {
  id: 'notif-1',
  schema: 'notification',
  identifier: 'SCBD/OES/DC/RH/JL/DM/91804',
  title: { en: 'Notification to Parties' },
  startDate: '2025-03-01',
  endDate: null,
  createdDate: '2025-02-15',
  status: 'published',
  statusKey: 'published',
  statusCOA: 'published',
  url: null,
  governingBodies: [],
  subsidiaryBodies: ['SBSTTA'],
  governingBodiesCOA: [],
  subsidiaryBodiesCOA: ['SBSTTA'],
  relatedRecords: [],
  relatedMeetings: [],
  relatedActivities: [],
  actionRequired: true,
  actionRequiredByParties: true,
  actionRequiredByPartiesCOA: true,
  symbol: 'SCBD/OES/DC/RH/91804',
  reference: 'Ref-001',
  sender: 'Executive Secretary',
  recipients: ['Parties', 'Indigenous Peoples'],
  actionDate: '2025-04-01',
  deadline: '2025-05-01',
  files: ['https://cbd.int/doc/1.pdf'],
  fulltext: { en: 'Full text content here' },
};

const baseActivity: CalendarActivityDoc = {
  id: 'activity-1',
  schema: 'calendarActivity',
  identifier: 'ACT-2025-001',
  title: { en: 'Peer Review' },
  startDate: '2025-06-01',
  endDate: '2025-06-30',
  createdDate: '2025-01-15',
  status: 'planned',
  statusKey: 'planned',
  statusCOA: 'planned',
  url: null,
  governingBodies: [],
  subsidiaryBodies: [],
  governingBodiesCOA: [],
  subsidiaryBodiesCOA: [],
  relatedRecords: [],
  relatedMeetings: ['cop-16'],
  relatedActivities: [],
  actionRequired: false,
  actionRequiredByParties: false,
  actionRequiredByPartiesCOA: false,
  type: 'peer-review',
  subType: null,
  description: { en: 'Peer review of national reports' },
  statusNarrative: { en: 'On track' },
  agendaItems: ['item-1'],
  subjects: ['biodiversity'],
  decisions: ['COP-15/4'],
  responsibleUnitsAndOfficers: ['SCBD/OES'],
  gbfTargets: ['GBF-TARGET-01'],
  gbfSections: ['GBF-SECTION-A'],
  outcome: null,
};

// ---------------------------------------------------------------------------
// Type guard / narrowing tests
// ---------------------------------------------------------------------------

describe('CalendarDoc discriminated union', () => {
  it('narrows to MeetingDoc via schema === "meeting"', () => {
    const doc: CalendarDoc = baseMeeting;

    if (doc.schema === 'meeting') {
      // TypeScript narrows here — these properties must be accessible
      expect(doc.meetingCode).toBe('cop-16');
      expect(doc.eventCity).toEqual({ en: 'Cali' });
      expect(doc.eventCountry).toEqual({ en: 'Colombia' });
      expect(doc.hostGovernments).toEqual(['co']);
      expect(doc.themes).toEqual(['biodiversity']);
      expect(doc.symbol).toBe('UNEP/CBD/COP/16/1');
    } else {
      // Should not reach this branch
      expect.unreachable('Should have narrowed to MeetingDoc');
    }
  });

  it('narrows to NotificationDoc via schema === "notification"', () => {
    const doc: CalendarDoc = baseNotification;

    if (doc.schema === 'notification') {
      expect(doc.symbol).toBe('SCBD/OES/DC/RH/91804');
      expect(doc.reference).toBe('Ref-001');
      expect(doc.sender).toBe('Executive Secretary');
      expect(doc.recipients).toContain('Parties');
      expect(doc.actionDate).toBe('2025-04-01');
      expect(doc.deadline).toBe('2025-05-01');
      expect(doc.files).toHaveLength(1);
      expect(doc.fulltext).toEqual({ en: 'Full text content here' });
    } else {
      expect.unreachable('Should have narrowed to NotificationDoc');
    }
  });

  it('narrows to CalendarActivityDoc via schema === "calendarActivity"', () => {
    const doc: CalendarDoc = baseActivity;

    if (doc.schema === 'calendarActivity') {
      expect(doc.type).toBe('peer-review');
      expect(doc.subType).toBeNull();
      expect(doc.description).toEqual({ en: 'Peer review of national reports' });
      expect(doc.subjects).toContain('biodiversity');
      expect(doc.decisions).toContain('COP-15/4');
      expect(doc.gbfTargets).toContain('GBF-TARGET-01');
      expect(doc.gbfSections).toContain('GBF-SECTION-A');
      expect(doc.agendaItems).toContain('item-1');
      expect(doc.responsibleUnitsAndOfficers).toContain('SCBD/OES');
    } else {
      expect.unreachable('Should have narrowed to CalendarActivityDoc');
    }
  });

  it('exhaustive switch narrows all variants', () => {
    const docs: CalendarDoc[] = [baseMeeting, baseNotification, baseActivity];
    const schemas: string[] = [];

    for (const doc of docs) {
      switch (doc.schema) {
        case 'meeting':
          schemas.push(`meeting:${doc.meetingCode}`);
          break;
        case 'notification':
          schemas.push(`notification:${doc.reference}`);
          break;
        case 'calendarActivity':
          schemas.push(`activity:${doc.type}`);
          break;
        default: {
          // Ensures exhaustive check at compile time
          const _exhaustive: never = doc;
          throw new Error(`Unknown schema: ${(_exhaustive as CalendarDoc).schema}`);
        }
      }
    }

    expect(schemas).toEqual([
      'meeting:cop-16',
      'notification:Ref-001',
      'activity:peer-review',
    ]);
  });
});

// ---------------------------------------------------------------------------
// CalendarSearchResult (SC-01) shape tests
// ---------------------------------------------------------------------------

describe('CalendarSearchResult (SC-01)', () => {
  it('uses "total" not "numFound"', () => {
    const result: CalendarSearchResult = {
      docs: [baseMeeting],
      total: 1,
      facets: {},
    };

    expect(result.total).toBe(1);
    expect(result).not.toHaveProperty('numFound');
  });

  it('default value shape matches contract', () => {
    const empty: CalendarSearchResult = {
      docs: [],
      total: 0,
      facets: {},
    };

    expect(empty.docs).toEqual([]);
    expect(empty.total).toBe(0);
    expect(empty.facets).toEqual({});
  });

  it('facets contain expected structure', () => {
    const facets: ParsedFacets = {
      schema: [
        { value: 'meeting', count: 5 },
        { value: 'notification', count: 3 },
      ],
      subjects: [
        { value: 'biodiversity', count: 8 },
      ],
    };

    const result: CalendarSearchResult = {
      docs: [],
      total: 0,
      facets,
    };

    expect(result.facets.schema).toHaveLength(2);
    expect(result.facets.schema![0]).toEqual({ value: 'meeting', count: 5 });
  });
});

// ---------------------------------------------------------------------------
// CalendarSearchParams (SC-04) shape tests
// ---------------------------------------------------------------------------

describe('CalendarSearchParams (SC-04)', () => {
  it('accepts all optional fields', () => {
    const params: CalendarSearchParams = {
      types: ['meeting'],
      subjects: ['biodiversity'],
      statuses: ['confirmed'],
      subsidiaryBodies: ['SBSTTA'],
      governingBodies: ['CBD-COP'],
      copDecisions: ['COP-15/4'],
      activityTypes: ['peer-review'],
      globalTargets: ['GBF-TARGET-01'],
      gbfSections: ['GBF-SECTION-A'],
      countries: ['co'],
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      actionRequired: true,
      searchText: 'biodiversity',
      sort: 'startDate asc',
      skip: 0,
      limit: 10,
    };

    expect(params.types).toEqual(['meeting']);
    expect(params.skip).toBe(0);
    expect(params.limit).toBe(10);
  });

  it('accepts empty object (all optional)', () => {
    const params: CalendarSearchParams = {};
    expect(Object.keys(params)).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// GroupedItem (SC-08) shape tests
// ---------------------------------------------------------------------------

describe('GroupedItem (SC-08)', () => {
  it('uses "items" not "docs"', () => {
    const group: GroupedItem = {
      key: '2025-03',
      label: 'March 2025',
      items: [baseMeeting],
    };

    expect(group.items).toHaveLength(1);
    expect(group).not.toHaveProperty('docs');
    expect(group.key).toBe('2025-03');
    expect(group.label).toBe('March 2025');
  });
});

// ---------------------------------------------------------------------------
// CalendarFilterState shape tests
// ---------------------------------------------------------------------------

describe('CalendarFilterState', () => {
  it('has required fields with defaults', () => {
    const state: CalendarFilterState = {
      types: [],
      subjects: [],
      statuses: [],
      subsidiaryBodies: [],
      governingBodies: [],
      copDecisions: [],
      activityTypes: [],
      globalTargets: [],
      gbfSections: [],
      countries: [],
      startDate: '',
      endDate: '',
      actionRequired: false,
      searchText: '',
      sort: 'startDate asc',
    };

    expect(state.types).toEqual([]);
    expect(state.actionRequired).toBe(false);
    expect(state.sort).toBe('startDate asc');
  });

  it('optional initialLoad defaults to undefined', () => {
    const state: CalendarFilterState = {
      types: [],
      subjects: [],
      statuses: [],
      subsidiaryBodies: [],
      governingBodies: [],
      copDecisions: [],
      activityTypes: [],
      globalTargets: [],
      gbfSections: [],
      countries: [],
      startDate: '',
      endDate: '',
      actionRequired: false,
      searchText: '',
      sort: '',
    };

    expect(state.initialLoad).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// CalendarFilterOption
// ---------------------------------------------------------------------------

describe('CalendarFilterOption', () => {
  it('has value, label, and optional count', () => {
    const option: CalendarFilterOption = {
      value: 'meeting',
      label: 'Meeting',
      count: 5,
    };

    expect(option.value).toBe('meeting');
    expect(option.label).toBe('Meeting');
    expect(option.count).toBe(5);
  });

  it('count is optional', () => {
    const option: CalendarFilterOption = {
      value: 'meeting',
      label: 'Meeting',
    };

    expect(option.count).toBeUndefined();
  });
});
