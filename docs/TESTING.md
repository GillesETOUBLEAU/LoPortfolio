# Testing Guide

## Current Status

Tests have been written but are currently failing due to React 19 incompatibility with React Testing Library.

## The Issue

React Testing Library (@testing-library/react) v16.3.1 does not yet fully support React 19.2.0. This causes the error:

```
TypeError: Cannot read properties of null (reading 'useState')
```

## Solutions

### Option 1: Downgrade React (Recommended)

Downgrade to React 18.x for full testing library support:

```bash
npm install react@^18.3.0 react-dom@^18.3.0
npm install --save-dev @types/react@^18.3.0 @types/react-dom@^18.3.0
```

Then run tests:
```bash
npm test
```

### Option 2: Wait for React Testing Library Update

Monitor the React Testing Library repository for React 19 support:
- https://github.com/testing-library/react-testing-library

### Option 3: Use E2E Testing Instead

Install Playwright for end-to-end testing:

```bash
npm install --save-dev @playwright/test
```

Create `playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: {
    baseURL: 'http://localhost:3000',
  },
});
```

## Running Tests

### Watch Mode
```bash
npm test
```

### Run Once
```bash
npm test -- --run
```

### UI Mode
```bash
npm run test:ui
```

### Coverage
```bash
npm run test:coverage
```

## Writing New Tests

### Testing a Component

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('should handle clicks', () => {
    const onClick = vi.fn();
    render(<MyComponent onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
```

### Testing a Hook

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should return initial value', () => {
    const { result } = renderHook(() => useMyHook());
    expect(result.current.value).toBe(0);
  });

  it('should update value', async () => {
    const { result } = renderHook(() => useMyHook());

    result.current.increment();

    await waitFor(() => {
      expect(result.current.value).toBe(1);
    });
  });
});
```

## Test Coverage Goals

### Critical Paths (Priority 1)
- ⏳ Error boundary behavior
- ⏳ Navigation state management
- ⏳ Detail page router

### Components (Priority 2)
- ⏳ Navigation component
- ⏳ GlassCard component
- ⏳ OrbitDiagram component

### Slides (Priority 3)
- ⏳ Cover slide
- ⏳ OrbitSystem slide
- ⏳ Other slides

### Integration Tests (Priority 4)
- ⏳ Navigation between slides
- ⏳ Detail page transitions

## Mocking

### Mocking localStorage

```typescript
beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  localStorage.clear();
});
```

### Mocking environment variables

```typescript
vi.mock('import.meta', () => ({
  env: {
    DEV: false,
  },
}));
```

## Continuous Integration

### GitHub Actions Example

Create `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --run

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()
```

## Debugging Tests

### Using console.log

```typescript
import { screen } from '@testing-library/react';

// See what's rendered
screen.debug();

// See specific element
screen.debug(screen.getByRole('button'));
```

### Using Vitest UI

```bash
npm run test:ui
```

Opens a browser interface for:
- Viewing test results
- Debugging failures
- Inspecting component state
- Time travel debugging

### Using VS Code Debugger

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--run"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Best Practices

1. **Test behavior, not implementation**
   - Test what the user sees and does
   - Avoid testing internal state

2. **Use accessible queries**
   - Prefer `getByRole`, `getByLabelText`
   - Avoid `getByTestId` unless necessary

3. **Test error states**
   - Test what happens when things go wrong
   - Test loading states
   - Test empty states

4. **Keep tests focused**
   - One assertion per test (when possible)
   - Clear test names
   - Arrange-Act-Assert pattern

5. **Clean up after tests**
   - Clear localStorage
   - Reset mocks
   - Cleanup DOM

## Troubleshooting

### Tests timeout
Increase timeout in vitest.config.ts:
```typescript
export default defineConfig({
  test: {
    testTimeout: 10000, // 10 seconds
  },
});
```

### Can't find element
Use `screen.debug()` to see what's rendered:
```typescript
screen.debug(); // See entire document
screen.debug(screen.getByRole('button')); // See specific element
```

### Async state updates
Use `waitFor` for async updates:
```typescript
await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

### Mock not working
Clear mocks between tests:
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
