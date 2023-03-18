import { registerBlockVariation } from '@wordpress/blocks';
import './style.scss';
import './editor.scss';

const VARIATION_NAME = 'peak-founders-query-loop';

registerBlockVariation('core/query', {
  save: () => { return null },
  name: VARIATION_NAME,
  scope: ['inserter'],
  title: 'Peak Founders Query Loop',
  description: 'A query loop for Peak Founders',
  isActive: ['namespace'],
  attributes: {
    className: 'peak-founders-query-loop',
    namespace: VARIATION_NAME,
    query: {
      postType: 'founders',
      perPage: 60, 
      offset: 0
    },
  },
  allowedControls: [],
  innerBlocks: [
    [
      'core/post-template',
      {},
      [['core/post-content']],
    ],
    ['core/query-pagination'],
    ['core/query-no-results'],
  ],
  isActive: ( { namespace, query } ) => {
    return (
        namespace === VARIATION_NAME
        && query.postType === 'founders'
    );
  },
});

const VARIATION_NAME_2 = 'peak-founders-query-loop-home';

registerBlockVariation('core/query', {
  name: VARIATION_NAME_2,
  scope: ['inserter'],
  title: 'Home Peak Founders Query Loop',
  description: 'A query loop for Peak Founders for the homepage',
  attributes: {
    className: 'peak-founders-query-loop-home',
    namespace: VARIATION_NAME_2,
    query: {
      postType: 'founders',
      perPage: 5, 
      offset: 0
    },
  },
  allowedControls: [],
  innerBlocks: [
    [
      'core/post-template',
      {},
      [['core/post-content'], ['core/post-title']],
    ],
    ['core/query-no-results'],
  ],
  isActive: ( { namespace, query } ) => {
    return (
        namespace === VARIATION_NAME_2
        && query.postType === 'founders'
    );
  },
});

