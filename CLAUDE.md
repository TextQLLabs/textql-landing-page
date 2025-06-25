# TextQLLabs Project Information

## GitHub Account
- **Logged in as**: TheEthanDing
- **Token scopes**: admin:org, delete:packages, repo, workflow, write:packages

## Organizations
- project-alexander
- TextQLLabs

## TextQLLabs Repositories
- demo
- blog  
- dbt-documentor
- fe
- TqlApi
- mkprompt
- dbt-redshift
- textql-frontend
- ana-engine
- dbt-doc-py
- ana
- ana-services
- ana-sandbox
- looker2dbt
- dialogue-engine
- dbt-doc-web
- aws-users
- dbt_test
- context-hub
- flow-hs-example
- thread-ux-study (this repository)

## Project Mappings
- **Frontend**: textql-frontend, fe
- **Backend API**: TqlApi, ana-engine, ana-services
- **Analytics**: ana, ana-sandbox
- **Documentation**: dbt-documentor, dbt-doc-py, dbt-doc-web, blog
- **Data Tools**: dbt-redshift, looker2dbt, dbt_test
- **AI/ML**: dialogue-engine, mkprompt, context-hub
- **Infrastructure**: aws-users
- **Examples**: demo, flow-hs-example

# Important Instruction Reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

# InsightsFeed Animation Sequence (Correct Implementation)

## Current Animation Phases
1. **initial** (RED debug bar) - Starting state
2. **cards-entering** (YELLOW debug bar) - Cards animating in
3. **cards-visible** (GREEN debug bar) - All cards visible and settled
4. **first-expanding** (BLUE debug bar) - First card expanding

## Correct Animation Flow

### On Page Load:
1. **initial** → Search animation plays → **cards-entering**
2. **cards-entering** → Cards slide in (all collapsed) with stagger → **cards-visible**
3. **cards-visible** → Brief pause (500ms) → **first-expanding**
4. **first-expanding** → First card expands

### On Industry Pill Click:
1. **first-expanding** → Reset expansion state → **initial**
2. **initial** → Brief pause (100ms) → **cards-entering**  
3. **cards-entering** → New cards slide in (all collapsed) → **cards-visible**
4. **cards-visible** → Brief pause (500ms) → **first-expanding**
5. **first-expanding** → First card expands

## Card States During Animation
- **cards-entering**: ALL cards collapsed, animating in with stagger
- **cards-visible**: ALL cards collapsed, stationary
- **first-expanding**: First card expanded, others collapsed

## Known Issues
- **Flash during cards-entering**: Cards animate to wrong position, then flash to correct position
- **Suspected cause**: Searchbar length change causing layout shift when industry pill clicked
- **Debug approach**: Check if searchbar width changes during industry transitions

## Animation Implementation Details
- Uses CSS transitions with stagger delays instead of Framer Motion
- `displayInsights` state keeps cards stable during industry transitions
- `cardsAnimationStage` controls opacity/transform for entrance animation
- Debug colors show current phase visually