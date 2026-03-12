import { describe, it, expect } from 'vitest';
import {
  normalizeSolrFieldName,
  normalizeSolrDocument,
} from '~/utils/calendar/solr-normalize';

// ---------------------------------------------------------------------------
// normalizeSolrFieldName
// ---------------------------------------------------------------------------

describe('normalizeSolrFieldName', () => {
  it('strips _ss suffix and preserves camelCase', () => {
    expect(normalizeSolrFieldName('governingBodies_ss')).toBe('governingBodies');
  });

  it('strips _dt suffix and preserves internal camelCase', () => {
    expect(normalizeSolrFieldName('startDateCOA_dt')).toBe('startDateCOA');
  });

  it('strips _t suffix', () => {
    expect(normalizeSolrFieldName('title_EN_t')).toBe('titleEn');
  });

  it('strips _s suffix', () => {
    expect(normalizeSolrFieldName('status_s')).toBe('status');
  });

  it('strips _b suffix', () => {
    expect(normalizeSolrFieldName('actionRequired_b')).toBe('actionRequired');
  });

  it('strips _i suffix', () => {
    expect(normalizeSolrFieldName('count_i')).toBe('count');
  });

  it('strips _l suffix', () => {
    expect(normalizeSolrFieldName('timestamp_l')).toBe('timestamp');
  });

  it('strips _ls suffix', () => {
    expect(normalizeSolrFieldName('ids_ls')).toBe('ids');
  });

  it('strips _d suffix', () => {
    expect(normalizeSolrFieldName('score_d')).toBe('score');
  });

  it('strips _ds suffix', () => {
    expect(normalizeSolrFieldName('scores_ds')).toBe('scores');
  });

  it('strips _txt suffix', () => {
    expect(normalizeSolrFieldName('content_txt')).toBe('content');
  });

  it('preserves underscored-prefixed fields', () => {
    expect(normalizeSolrFieldName('_version_')).toBe('_version_');
  });

  it('handles fields with no recognized suffix', () => {
    expect(normalizeSolrFieldName('id')).toBe('id');
  });

  it('lowercases all-caps segments after first', () => {
    expect(normalizeSolrFieldName('title_EN_t')).toBe('titleEn');
  });

  it('camelizes multiple underscore segments', () => {
    expect(normalizeSolrFieldName('subsidiary_body_COA_ss')).toBe('subsidiaryBodyCoa');
  });
});

// ---------------------------------------------------------------------------
// normalizeSolrDocument
// ---------------------------------------------------------------------------

describe('normalizeSolrDocument', () => {
  it('transforms all keys to camelCase', () => {
    const doc = {
      governingBodies_ss: ['CBD-COP'],
      status_s: 'confirmed',
      title_EN_t: 'Meeting',
    };

    const result = normalizeSolrDocument(doc);

    expect(result['governingBodies']).toEqual(['CBD-COP']);
    expect(result['status']).toBe('confirmed');
    expect(result['titleEn']).toBe('Meeting');
  });

  it('merges arrays when multiple fields normalize to the same key', () => {
    const doc = {
      subjects_ss: ['biodiversity'],
      subjects_txt: ['marine'],
    };

    const result = normalizeSolrDocument(doc);
    const subjects = result['subjects'] as string[];

    expect(subjects).toContain('biodiversity');
    expect(subjects).toContain('marine');
  });

  it('preserves non-array values for first occurrence', () => {
    const doc = {
      status_s: 'confirmed',
      status_t: 'Confirmed',
    };

    const result = normalizeSolrDocument(doc);

    expect(result['status']).toBe('confirmed');
  });

  it('replaces null/undefined existing values with new values', () => {
    const doc = {
      field_s: null as unknown as string,
      field_t: 'value',
    };

    const result = normalizeSolrDocument(doc);

    expect(result['field']).toBe('value');
  });

  it('handles empty documents', () => {
    const result = normalizeSolrDocument({});

    expect(Object.keys(result)).toHaveLength(0);
  });

  it('deduplicates merged array items', () => {
    const doc = {
      tags_ss: ['a', 'b'],
      tags_txt: ['b', 'c'],
    };

    const result = normalizeSolrDocument(doc);
    const tags = result['tags'] as string[];

    expect(tags).toEqual(['a', 'b', 'c']);
  });
});
