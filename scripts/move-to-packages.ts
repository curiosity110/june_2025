#!/usr/bin/env ts-node
/**
 * Move a source file or directory into a monorepo package and rewrite imports.
 * Usage: pnpm move-to-packages path/to/file.tsx ui
 */
import { execSync } from 'child_process';
import path from 'path';
import { createScopedLogger } from '../src/utils/logger';

const log = createScopedLogger('scripts:move-to-packages');

const [, , src, pkg] = process.argv;
if (!src || !pkg) {
  log.error('Usage: pnpm move-to-packages <src> <package>');
  process.exit(1);
}

const destDir = path.join('packages', pkg, 'src');
const dest = path.join(destDir, path.basename(src));
execSync(`mkdir -p ${destDir}`);
execSync(`git mv ${src} ${dest}`, { stdio: 'inherit' });

// jscodeshift codemod to update import paths
// expects scripts/codemods/update-imports.ts to exist
try {
  execSync(`npx jscodeshift -t scripts/codemods/update-imports.ts ${dest} '**/*.{ts,tsx}'`, {
    stdio: 'inherit',
    shell: '/bin/bash',
  });
} catch (err) {
  log.error('Codemod failed', err);
}

// Update Storybook stories referencing the old path
try {
  execSync(`grep -rl "${src}" . | grep -E '\\.stories\\.(tsx|ts)$' | xargs sed -i '' -e 's#${src}#${dest}#g'`, {
    stdio: 'inherit',
    shell: '/bin/bash',
  });
} catch {
  // ignore when no stories are found
}

log.info(`Moved ${src} -> ${dest}`);
