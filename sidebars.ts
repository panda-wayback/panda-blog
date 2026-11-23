import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';
import {buildSidebars} from './docsSections';

// Sidebars are generated from first-level folders under docs/.
// See docsSections.ts and docs/<section>/_nav.json
const sidebars: SidebarsConfig = buildSidebars();

export default sidebars;
