# Incremental Package Extraction Plan

This project will gradually adopt a Turborepo style monorepo. The root Next.js app remains deployable at each step.

1. **Create empty packages** – already done (`packages/ui`, `packages/server`).
2. **Move components or libs in small batches** using `pnpm move-to-packages`.
3. **After each move** run `pnpm lint && pnpm test && pnpm build` to ensure nothing breaks.
4. **Update imports** are handled by the script, but verify storybook stories compile.
5. **Rollback** by reverting the git commit that moved the files. Because `git mv` is used, history is preserved.

Repeat until all reusable code lives inside the packages.
