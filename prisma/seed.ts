/**
 * Seed file for local development and demo.
 * Creates test users, mentors, marketplace cards,
 * sessions, reviews, and a question bank by category.
 *
 * Run: npx prisma db seed
 * Password for all test accounts: password123
 *
 * ⚠️ Deletes all existing data before seeding.
 * Do not run in production.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// -------------------------------------------------------------------
// Question bank
// -------------------------------------------------------------------
const questionBank = [
  // ────────────────────────────────────────────────────────────────
  // JAVASCRIPT
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "JavaScript",
    categorySlug: "javascript",
    questions: [
      {
        text: "What is the output of: typeof null?",
        options: [
          { text: '"null"', isCorrect: false },
          { text: '"object"', isCorrect: true },
          { text: '"undefined"', isCorrect: false },
          { text: '"string"', isCorrect: false },
        ],
      },
      {
        text: "Which of the following correctly describes a closure?",
        options: [
          {
            text: "A function that runs immediately after it is defined",
            isCorrect: false,
          },
          {
            text: "A function bundled together with references to its surrounding lexical scope",
            isCorrect: true,
          },
          {
            text: "A function that accepts another function as an argument",
            isCorrect: false,
          },
          { text: "A function that returns a Promise", isCorrect: false },
        ],
      },
      {
        text: "What does the Event Loop do in JavaScript?",
        options: [
          {
            text: "Executes synchronous code in parallel threads",
            isCorrect: false,
          },
          { text: "Manages memory allocation for variables", isCorrect: false },
          {
            text: "Moves tasks from the callback queue to the call stack when the stack is empty",
            isCorrect: true,
          },
          {
            text: "Compiles JavaScript code before execution",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between == and ===?",
        options: [
          {
            text: "=== checks value only, == checks value and type",
            isCorrect: false,
          },
          {
            text: "== checks value only with type coercion, === checks value and type without coercion",
            isCorrect: true,
          },
          {
            text: "There is no difference in modern JavaScript",
            isCorrect: false,
          },
          {
            text: "== is used for objects, === for primitives",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is hoisting in JavaScript?",
        options: [
          {
            text: "The process of converting synchronous code to asynchronous",
            isCorrect: false,
          },
          {
            text: "Moving variable and function declarations to the top of their scope before execution",
            isCorrect: true,
          },
          {
            text: "Copying a variable from outer scope into inner scope",
            isCorrect: false,
          },
          {
            text: "The automatic type conversion between values",
            isCorrect: false,
          },
        ],
      },
      {
        text: "Which statement about `let` and `var` is correct?",
        options: [
          {
            text: "`let` is function-scoped, `var` is block-scoped",
            isCorrect: false,
          },
          {
            text: "`var` is block-scoped, `let` is global-scoped",
            isCorrect: false,
          },
          {
            text: "`let` is block-scoped, `var` is function-scoped",
            isCorrect: true,
          },
          { text: "Both are block-scoped", isCorrect: false },
        ],
      },
      {
        text: "What does Array.prototype.reduce() do?",
        options: [
          { text: "Filters out falsy values from an array", isCorrect: false },
          {
            text: "Executes a reducer function on each element, returning a single accumulated value",
            isCorrect: true,
          },
          {
            text: "Creates a new array with the results of calling a function on every element",
            isCorrect: false,
          },
          { text: "Removes duplicate values from an array", isCorrect: false },
        ],
      },
      {
        text: "What is a Promise in JavaScript?",
        options: [
          {
            text: "A synchronous wrapper around a callback function",
            isCorrect: false,
          },
          {
            text: "An object representing the eventual completion or failure of an async operation",
            isCorrect: true,
          },
          {
            text: "A special type of array for storing async results",
            isCorrect: false,
          },
          {
            text: "A function that always returns undefined",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between `null` and `undefined`?",
        options: [
          {
            text: "`null` means a variable has not been declared; `undefined` means it has no value",
            isCorrect: false,
          },
          {
            text: "They are completely identical in JavaScript",
            isCorrect: false,
          },
          {
            text: "`undefined` means a variable is declared but not assigned; `null` is an intentional absence of value",
            isCorrect: true,
          },
          {
            text: "`null` is a string type; `undefined` is a number type",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the `this` keyword refer to inside an arrow function?",
        options: [
          { text: "The function itself", isCorrect: false },
          { text: "The global object always", isCorrect: false },
          {
            text: "The `this` value of the enclosing lexical context",
            isCorrect: true,
          },
          {
            text: "undefined in strict mode, window otherwise",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is prototype chain in JavaScript?",
        options: [
          {
            text: "A list of all methods defined on the Array class",
            isCorrect: false,
          },
          {
            text: "A mechanism by which objects inherit properties from other objects",
            isCorrect: true,
          },
          {
            text: "The order in which event listeners are executed",
            isCorrect: false,
          },
          { text: "A chain of Promises linked together", isCorrect: false },
        ],
      },
      {
        text: "What does `Array.prototype.map()` return?",
        options: [
          { text: "The original array, modified in place", isCorrect: false },
          {
            text: "A new array with the results of calling a function on every element",
            isCorrect: true,
          },
          { text: "A single accumulated value", isCorrect: false },
          {
            text: "A boolean indicating whether all elements passed the test",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is event delegation?",
        options: [
          {
            text: "Attaching an event listener to each child element individually",
            isCorrect: false,
          },
          {
            text: "Preventing an event from bubbling up the DOM tree",
            isCorrect: false,
          },
          {
            text: "Attaching a single event listener to a parent element to handle events from children",
            isCorrect: true,
          },
          {
            text: "Dispatching custom events from child to parent components",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the output of: `0.1 + 0.2 === 0.3` in JavaScript?",
        options: [
          { text: "true", isCorrect: false },
          { text: "false", isCorrect: true },
          { text: "NaN", isCorrect: false },
          { text: "undefined", isCorrect: false },
        ],
      },
      {
        text: "Which method is used to create a shallow copy of an object?",
        options: [
          { text: "Object.freeze()", isCorrect: false },
          {
            text: "Object.assign({}, obj) or spread syntax {...obj}",
            isCorrect: true,
          },
          { text: "JSON.stringify() only", isCorrect: false },
          { text: "Object.create(obj)", isCorrect: false },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // TYPESCRIPT
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "TypeScript",
    categorySlug: "typescript",
    questions: [
      {
        text: "What is the difference between `interface` and `type` in TypeScript?",
        options: [
          {
            text: "They are completely interchangeable with no differences",
            isCorrect: false,
          },
          {
            text: "`interface` can be extended and merged; `type` supports unions, intersections and mapped types more flexibly",
            isCorrect: true,
          },
          { text: "`type` can only be used for primitives", isCorrect: false },
          {
            text: "`interface` is deprecated in newer TypeScript versions",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the `unknown` type mean in TypeScript?",
        options: [
          {
            text: "It is the same as `any` — no type checking is applied",
            isCorrect: false,
          },
          {
            text: "A type-safe alternative to `any` — you must narrow it before use",
            isCorrect: true,
          },
          {
            text: "It represents a value that will always be undefined",
            isCorrect: false,
          },
          {
            text: "It is used only for function return types",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a generic in TypeScript?",
        options: [
          {
            text: "A built-in utility type like Partial or Readonly",
            isCorrect: false,
          },
          {
            text: "A way to create reusable components that work with multiple types",
            isCorrect: true,
          },
          {
            text: "A type that accepts only primitive values",
            isCorrect: false,
          },
          { text: "A decorator applied to classes", isCorrect: false },
        ],
      },
      {
        text: "What does `Partial<T>` do?",
        options: [
          { text: "Makes all properties of T required", isCorrect: false },
          { text: "Removes all optional properties from T", isCorrect: false },
          { text: "Makes all properties of T optional", isCorrect: true },
          { text: "Creates a readonly version of T", isCorrect: false },
        ],
      },
      {
        text: "What is a union type in TypeScript?",
        options: [
          {
            text: "A type that must satisfy multiple types simultaneously",
            isCorrect: false,
          },
          {
            text: "A type that can be one of several specified types",
            isCorrect: true,
          },
          { text: "A type used only with arrays", isCorrect: false },
          { text: "A special type for combining interfaces", isCorrect: false },
        ],
      },
      {
        text: "What does the `never` type represent?",
        options: [
          {
            text: "A value that is always null or undefined",
            isCorrect: false,
          },
          {
            text: "A type for variables that will never be assigned",
            isCorrect: false,
          },
          {
            text: "A value that never occurs — used for exhaustive checks and functions that never return",
            isCorrect: true,
          },
          { text: "An alias for void", isCorrect: false },
        ],
      },
      {
        text: "What is type narrowing in TypeScript?",
        options: [
          {
            text: "Reducing the number of properties in a type",
            isCorrect: false,
          },
          {
            text: "Refining a broader type to a more specific one using runtime checks",
            isCorrect: true,
          },
          {
            text: "Casting a type using the `as` keyword only",
            isCorrect: false,
          },
          {
            text: "Removing optional fields from an interface",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `readonly` do in TypeScript?",
        options: [
          { text: "Makes a property required at runtime", isCorrect: false },
          {
            text: "Prevents a property from being reassigned after initialization",
            isCorrect: true,
          },
          {
            text: "Makes an entire object immutable at runtime",
            isCorrect: false,
          },
          { text: "It is the same as `const` for variables", isCorrect: false },
        ],
      },
      {
        text: "What is the purpose of `as const` in TypeScript?",
        options: [
          {
            text: "Converts a value to a constant expression with literal types and readonly properties",
            isCorrect: true,
          },
          { text: "Casts the value to the `const` type", isCorrect: false },
          {
            text: "Prevents the variable from being exported",
            isCorrect: false,
          },
          { text: "It is identical to `Object.freeze()`", isCorrect: false },
        ],
      },
      {
        text: "What does `Pick<T, K>` do?",
        options: [
          { text: "Removes keys K from type T", isCorrect: false },
          {
            text: "Creates a type by picking a set of properties K from T",
            isCorrect: true,
          },
          { text: "Makes properties K required in T", isCorrect: false },
          { text: "Merges two types together", isCorrect: false },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // REACT
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "React",
    categorySlug: "react",
    questions: [
      {
        text: "What is the purpose of the `key` prop in React lists?",
        options: [
          { text: "It styles the list item uniquely", isCorrect: false },
          {
            text: "It helps React identify which items have changed, been added, or removed",
            isCorrect: true,
          },
          {
            text: "It passes data from parent to child component",
            isCorrect: false,
          },
          {
            text: "It prevents re-renders of the entire list",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `useEffect` with an empty dependency array `[]` do?",
        options: [
          { text: "Runs the effect on every render", isCorrect: false },
          {
            text: "Runs the effect only once after the initial render",
            isCorrect: true,
          },
          {
            text: "Runs the effect only when the component unmounts",
            isCorrect: false,
          },
          { text: "Disables the effect completely", isCorrect: false },
        ],
      },
      {
        text: "What is the difference between controlled and uncontrolled components?",
        options: [
          {
            text: "Controlled components use refs; uncontrolled use state",
            isCorrect: false,
          },
          {
            text: "Controlled components have their state managed by React; uncontrolled manage their own state via the DOM",
            isCorrect: true,
          },
          {
            text: "Uncontrolled components cannot be used with forms",
            isCorrect: false,
          },
          { text: "There is no practical difference", isCorrect: false },
        ],
      },
      {
        text: "What does `useMemo` do?",
        options: [
          {
            text: "Memoizes a callback function to prevent re-creation on every render",
            isCorrect: false,
          },
          {
            text: "Caches the result of a computation and recomputes it only when dependencies change",
            isCorrect: true,
          },
          {
            text: "Stores a mutable value that persists between renders",
            isCorrect: false,
          },
          {
            text: "Prevents the component from re-rendering entirely",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is lifting state up in React?",
        options: [
          {
            text: "Moving state from a child component to a shared parent so siblings can access it",
            isCorrect: true,
          },
          {
            text: "Using the Context API to share state globally",
            isCorrect: false,
          },
          {
            text: "Storing component state in a global Redux store",
            isCorrect: false,
          },
          {
            text: "Initializing state at the top of a component file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is React reconciliation?",
        options: [
          { text: "The process of converting JSX to HTML", isCorrect: false },
          {
            text: "The algorithm React uses to diff the virtual DOM and update only what changed in the real DOM",
            isCorrect: true,
          },
          {
            text: "The mechanism for managing side effects in functional components",
            isCorrect: false,
          },
          { text: "The way React handles form submissions", isCorrect: false },
        ],
      },
      {
        text: "What does `useCallback` do?",
        options: [
          {
            text: "Caches the result of an expensive calculation",
            isCorrect: false,
          },
          {
            text: "Returns a memoized version of a callback that only changes when dependencies change",
            isCorrect: true,
          },
          {
            text: "Calls a function after every render automatically",
            isCorrect: false,
          },
          {
            text: "Replaces `useEffect` for async operations",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the Context API used for?",
        options: [
          {
            text: "Optimizing render performance with memoization",
            isCorrect: false,
          },
          {
            text: "Sharing state across the component tree without prop drilling",
            isCorrect: true,
          },
          { text: "Fetching data from an external API", isCorrect: false },
          {
            text: "Replacing the need for any state management",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `useRef` return?",
        options: [
          {
            text: "A state variable that triggers re-renders when changed",
            isCorrect: false,
          },
          {
            text: "A mutable ref object whose `.current` property persists for the full lifetime of the component",
            isCorrect: true,
          },
          { text: "A reference to the parent component", isCorrect: false },
          { text: "A copy of the previous state value", isCorrect: false },
        ],
      },
      {
        text: "When does React re-render a component?",
        options: [
          { text: "Only when props change", isCorrect: false },
          {
            text: "When state or props change, or when the parent re-renders",
            isCorrect: true,
          },
          { text: "Only when state changes via useState", isCorrect: false },
          {
            text: "On every browser event regardless of state",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is `React.memo` used for?",
        options: [
          {
            text: "Memoizing the return value of an expensive hook",
            isCorrect: false,
          },
          {
            text: "Wrapping a component to skip re-rendering when props have not changed",
            isCorrect: true,
          },
          {
            text: "Storing large amounts of data between renders",
            isCorrect: false,
          },
          {
            text: "Replacing class component lifecycle methods",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a custom hook in React?",
        options: [
          {
            text: "A built-in React hook with a custom configuration",
            isCorrect: false,
          },
          {
            text: "A JavaScript function starting with `use` that can call other hooks and encapsulates reusable logic",
            isCorrect: true,
          },
          {
            text: "A hook that only works inside class components",
            isCorrect: false,
          },
          { text: "A component that returns null", isCorrect: false },
        ],
      },
      {
        text: "What happens if you call `setState` inside `useEffect` without proper dependencies?",
        options: [
          {
            text: "Nothing — React ignores redundant state updates",
            isCorrect: false,
          },
          { text: "It can cause an infinite render loop", isCorrect: true },
          { text: "The component unmounts automatically", isCorrect: false },
          { text: "React throws a compile-time error", isCorrect: false },
        ],
      },
      {
        text: "What is prop drilling?",
        options: [
          {
            text: "A performance optimization technique for deep component trees",
            isCorrect: false,
          },
          {
            text: "Passing props through multiple intermediate components that don't need them",
            isCorrect: true,
          },
          {
            text: "Directly mutating props inside a child component",
            isCorrect: false,
          },
          {
            text: "Using the spread operator to pass all props at once",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the `useReducer` hook do?",
        options: [
          {
            text: "Connects a React component to a Redux store",
            isCorrect: false,
          },
          {
            text: "Manages complex state logic by dispatching actions to a reducer function",
            isCorrect: true,
          },
          {
            text: "Reduces the number of re-renders in a component",
            isCorrect: false,
          },
          { text: "Replaces the need for useEffect", isCorrect: false },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // NEXT.JS
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "Next.js",
    categorySlug: "nextjs",
    questions: [
      {
        text: "What is the difference between Server Components and Client Components in Next.js App Router?",
        options: [
          {
            text: "Server Components run in the browser; Client Components run on the server",
            isCorrect: false,
          },
          {
            text: "Server Components render on the server with no client-side JS; Client Components hydrate in the browser and can use hooks and events",
            isCorrect: true,
          },
          {
            text: "There is no difference — it is just a naming convention",
            isCorrect: false,
          },
          {
            text: "Client Components cannot receive props from Server Components",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does the `'use client'` directive do?",
        options: [
          {
            text: "Marks a file as a Client Component, enabling browser APIs, hooks, and event handlers",
            isCorrect: true,
          },
          {
            text: "Disables server-side rendering for the entire page",
            isCorrect: false,
          },
          {
            text: "Tells Next.js to serve the file as a static asset",
            isCorrect: false,
          },
          {
            text: "Enables React Server Components in the file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the purpose of `layout.tsx` in the App Router?",
        options: [
          {
            text: "It defines a page that is only visible to authenticated users",
            isCorrect: false,
          },
          {
            text: "It wraps child pages with shared UI that persists across navigation without re-mounting",
            isCorrect: true,
          },
          {
            text: "It replaces `_app.tsx` and re-renders on every route change",
            isCorrect: false,
          },
          { text: "It is used only for error boundaries", isCorrect: false },
        ],
      },
      {
        text: "How do you create a dynamic route segment in Next.js App Router?",
        options: [
          {
            text: "By naming the folder with a colon prefix like `:id`",
            isCorrect: false,
          },
          {
            text: "By naming the folder with square brackets like `[id]`",
            isCorrect: true,
          },
          {
            text: "By exporting a `getStaticPaths` function",
            isCorrect: false,
          },
          {
            text: "By adding a `dynamic` export in the page file",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the correct way to read search params in a Server Component in Next.js?",
        options: [
          { text: "Using `useRouter().query`", isCorrect: false },
          { text: "Using `useSearchParams()` hook", isCorrect: false },
          {
            text: "Via the `searchParams` prop passed to the page component",
            isCorrect: true,
          },
          { text: "Via `getServerSideProps`", isCorrect: false },
        ],
      },
      {
        text: "What does `router.refresh()` do in Next.js?",
        options: [
          { text: "Performs a full browser page reload", isCorrect: false },
          {
            text: "Re-fetches server data for the current route and re-renders Server Components without losing client state",
            isCorrect: true,
          },
          {
            text: "Clears the Next.js router cache entirely",
            isCorrect: false,
          },
          { text: "Redirects the user to the home page", isCorrect: false },
        ],
      },
      {
        text: "Where should you put an API route handler in the Next.js App Router?",
        options: [
          { text: "In `pages/api/` folder", isCorrect: false },
          {
            text: "In `src/app/api/` in a file named `route.ts`",
            isCorrect: true,
          },
          { text: "In `src/app/` in a file named `api.ts`", isCorrect: false },
          { text: "In `src/lib/` folder", isCorrect: false },
        ],
      },
      {
        text: "What is `getServerSession` used for in Next.js with NextAuth?",
        options: [
          {
            text: "Reading the session on the client side inside a hook",
            isCorrect: false,
          },
          {
            text: "Reading the current session in Server Components and API route handlers",
            isCorrect: true,
          },
          { text: "Creating a new session after login", isCorrect: false },
          { text: "Refreshing an expired JWT token", isCorrect: false },
        ],
      },
      {
        text: "What does the `loading.tsx` file do in Next.js App Router?",
        options: [
          {
            text: "Displays a loading spinner for the entire application",
            isCorrect: false,
          },
          {
            text: "Automatically wraps the page in a Suspense boundary and shows a fallback UI while the page is loading",
            isCorrect: true,
          },
          {
            text: "Replaces the error boundary for async components",
            isCorrect: false,
          },
          {
            text: "Delays the rendering of a page by a set amount of time",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is middleware used for in Next.js?",
        options: [
          {
            text: "Running server-only database queries before a page renders",
            isCorrect: false,
          },
          {
            text: "Intercepting requests before they reach a page or API route — used for auth, redirects, and rewrites",
            isCorrect: true,
          },
          {
            text: "Globally wrapping all components with a context provider",
            isCorrect: false,
          },
          { text: "Caching API responses on the CDN level", isCorrect: false },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // NODE.JS
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "Node.js",
    categorySlug: "nodejs",
    questions: [
      {
        text: "What is the Event Loop in Node.js?",
        options: [
          {
            text: "A loop that runs for each HTTP request on a separate thread",
            isCorrect: false,
          },
          {
            text: "The mechanism that allows Node.js to perform non-blocking I/O by offloading operations and executing callbacks when complete",
            isCorrect: true,
          },
          {
            text: "A built-in module for handling events in the DOM",
            isCorrect: false,
          },
          {
            text: "A loop that continuously polls the database for new data",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `process.env` provide in Node.js?",
        options: [
          { text: "A list of all running Node.js processes", isCorrect: false },
          {
            text: "Access to environment variables set in the operating system or `.env` file",
            isCorrect: true,
          },
          {
            text: "The current CPU and memory usage of the process",
            isCorrect: false,
          },
          { text: "A way to spawn child processes", isCorrect: false },
        ],
      },
      {
        text: "What is the difference between `require()` and `import` in Node.js?",
        options: [
          {
            text: "`require()` is asynchronous; `import` is synchronous",
            isCorrect: false,
          },
          {
            text: "`require()` is CommonJS (loaded at runtime); `import` is ES Modules (statically analyzed)",
            isCorrect: true,
          },
          { text: "They are completely identical", isCorrect: false },
          {
            text: "`import` only works in the browser, not Node.js",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `fs.readFile` do in Node.js?",
        options: [
          {
            text: "Reads a file synchronously and blocks the event loop",
            isCorrect: false,
          },
          {
            text: "Reads a file asynchronously and calls a callback or returns a Promise when done",
            isCorrect: true,
          },
          {
            text: "Streams a file directly to an HTTP response",
            isCorrect: false,
          },
          { text: "Only reads JSON files", isCorrect: false },
        ],
      },
      {
        text: "What is middleware in Express.js?",
        options: [
          {
            text: "A database layer between the app and PostgreSQL",
            isCorrect: false,
          },
          {
            text: "A function with access to `req`, `res`, and `next` that can modify the request/response or pass control to the next handler",
            isCorrect: true,
          },
          { text: "A built-in caching mechanism in Express", isCorrect: false },
          {
            text: "A special route that handles 404 errors only",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a stream in Node.js?",
        options: [
          {
            text: "A live database connection that updates automatically",
            isCorrect: false,
          },
          {
            text: "An abstract interface for working with streaming data — reading or writing in chunks rather than all at once",
            isCorrect: true,
          },
          {
            text: "A WebSocket connection between client and server",
            isCorrect: false,
          },
          {
            text: "A way to run multiple functions in parallel",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `npm run build` typically do in a Node.js project?",
        options: [
          {
            text: "Installs all dependencies listed in package.json",
            isCorrect: false,
          },
          {
            text: "Executes the `build` script defined in package.json, usually compiling TypeScript or bundling assets",
            isCorrect: true,
          },
          { text: "Starts the development server", isCorrect: false },
          {
            text: "Publishes the package to the npm registry",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the purpose of `package-lock.json`?",
        options: [
          {
            text: "It lists only the direct dependencies of the project",
            isCorrect: false,
          },
          {
            text: "It locks the exact versions of all installed dependencies to ensure reproducible installs",
            isCorrect: true,
          },
          {
            text: "It prevents anyone from adding new packages",
            isCorrect: false,
          },
          { text: "It is generated only when using Yarn", isCorrect: false },
        ],
      },
      {
        text: "What does `Buffer` represent in Node.js?",
        options: [
          {
            text: "A temporary array of strings used in async operations",
            isCorrect: false,
          },
          {
            text: "A fixed-size chunk of memory for working with binary data like files and network streams",
            isCorrect: true,
          },
          { text: "A caching layer for HTTP responses", isCorrect: false },
          {
            text: "A built-in type for storing JSON objects",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is clustering in Node.js?",
        options: [
          {
            text: "Grouping related routes together in Express",
            isCorrect: false,
          },
          {
            text: "Spawning multiple worker processes to handle load across CPU cores, since Node.js is single-threaded",
            isCorrect: true,
          },
          {
            text: "Sharing state between multiple Node.js applications",
            isCorrect: false,
          },
          {
            text: "A technique for caching database queries",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CSS
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "CSS",
    categorySlug: "css",
    questions: [
      {
        text: "What is the CSS Box Model?",
        options: [
          { text: "A system for creating grid layouts", isCorrect: false },
          {
            text: "A model describing how elements are rendered as boxes with content, padding, border, and margin",
            isCorrect: true,
          },
          {
            text: "A method for positioning elements absolutely on the page",
            isCorrect: false,
          },
          {
            text: "A way to apply 3D transformations to elements",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between `display: none` and `visibility: hidden`?",
        options: [
          {
            text: "They are identical — both hide the element and remove it from the layout",
            isCorrect: false,
          },
          {
            text: "`display: none` removes the element from the layout flow; `visibility: hidden` hides it but keeps its space",
            isCorrect: true,
          },
          {
            text: "`visibility: hidden` removes the element from the DOM",
            isCorrect: false,
          },
          {
            text: "`display: none` only hides the element visually",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `position: absolute` do?",
        options: [
          {
            text: "Positions the element relative to the viewport always",
            isCorrect: false,
          },
          {
            text: "Positions the element relative to its nearest positioned ancestor (not static)",
            isCorrect: true,
          },
          {
            text: "Keeps the element fixed during scrolling",
            isCorrect: false,
          },
          {
            text: "Removes the element from the DOM flow like `display: none`",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is specificity in CSS?",
        options: [
          { text: "The order in which CSS files are loaded", isCorrect: false },
          {
            text: "A weight system that determines which CSS rule is applied when multiple rules target the same element",
            isCorrect: true,
          },
          {
            text: "The speed at which the browser applies CSS styles",
            isCorrect: false,
          },
          {
            text: "A property that sets the exact pixel size of an element",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is Flexbox primarily used for?",
        options: [
          {
            text: "Creating two-dimensional grid layouts with rows and columns",
            isCorrect: false,
          },
          {
            text: "Laying out elements in a single direction (row or column) with alignment and distribution control",
            isCorrect: true,
          },
          { text: "Animating elements along a path", isCorrect: false },
          {
            text: "Adding responsive breakpoints to a layout",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does `z-index` control?",
        options: [
          { text: "The zoom level of an element", isCorrect: false },
          {
            text: "The stacking order of positioned elements along the z-axis",
            isCorrect: true,
          },
          { text: "The transparency of an element", isCorrect: false },
          { text: "The horizontal position of an element", isCorrect: false },
        ],
      },
      {
        text: "What is a CSS pseudo-class?",
        options: [
          { text: "A fake class added by JavaScript", isCorrect: false },
          {
            text: "A keyword added to a selector that specifies a special state of the selected element (e.g. :hover, :focus)",
            isCorrect: true,
          },
          {
            text: "A class that applies styles only on mobile devices",
            isCorrect: false,
          },
          { text: "A CSS variable defined with `--` prefix", isCorrect: false },
        ],
      },
      {
        text: "What does `box-sizing: border-box` do?",
        options: [
          {
            text: "Adds a border around every element on the page",
            isCorrect: false,
          },
          {
            text: "Makes the element's width and height include padding and border, not just the content",
            isCorrect: true,
          },
          {
            text: "Resets all box model properties to their defaults",
            isCorrect: false,
          },
          {
            text: "Makes padding and margin collapse into each other",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a CSS media query used for?",
        options: [
          {
            text: "Loading different images based on the user's device",
            isCorrect: false,
          },
          {
            text: "Applying different styles based on device characteristics like screen width or orientation",
            isCorrect: true,
          },
          { text: "Playing audio or video content in CSS", isCorrect: false },
          {
            text: "Querying the DOM for elements with a specific class",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between CSS Grid and Flexbox?",
        options: [
          {
            text: "Grid is for styling text; Flexbox is for layout",
            isCorrect: false,
          },
          {
            text: "Grid is two-dimensional (rows and columns); Flexbox is one-dimensional (row or column)",
            isCorrect: true,
          },
          {
            text: "Flexbox works in all browsers; Grid only works in Chrome",
            isCorrect: false,
          },
          {
            text: "They are identical — Grid is just newer syntax for Flexbox",
            isCorrect: false,
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  // CS FUNDAMENTALS
  // ────────────────────────────────────────────────────────────────
  {
    categoryName: "CS Fundamentals",
    categorySlug: "cs-fundamentals",
    questions: [
      {
        text: "What is the time complexity of binary search?",
        options: [
          { text: "O(n)", isCorrect: false },
          { text: "O(log n)", isCorrect: true },
          { text: "O(n²)", isCorrect: false },
          { text: "O(1)", isCorrect: false },
        ],
      },
      {
        text: "What is the difference between a stack and a queue?",
        options: [
          { text: "A stack is FIFO; a queue is LIFO", isCorrect: false },
          {
            text: "A stack is LIFO (last in, first out); a queue is FIFO (first in, first out)",
            isCorrect: true,
          },
          {
            text: "They are the same data structure with different names",
            isCorrect: false,
          },
          {
            text: "A stack allows random access; a queue does not",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does Big O notation describe?",
        options: [
          {
            text: "The exact runtime of an algorithm in milliseconds",
            isCorrect: false,
          },
          {
            text: "The upper bound of an algorithm's growth rate as input size increases",
            isCorrect: true,
          },
          {
            text: "The minimum memory required by an algorithm",
            isCorrect: false,
          },
          {
            text: "The number of lines of code in an algorithm",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a hash table?",
        options: [
          {
            text: "A table storing only numeric values in sorted order",
            isCorrect: false,
          },
          {
            text: "A data structure that maps keys to values using a hash function for fast O(1) average lookups",
            isCorrect: true,
          },
          { text: "A special type of binary tree", isCorrect: false },
          {
            text: "A linked list where each node has a unique key",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is recursion?",
        options: [
          {
            text: "A loop that runs a fixed number of times",
            isCorrect: false,
          },
          {
            text: "A function that calls itself with a smaller input until it reaches a base case",
            isCorrect: true,
          },
          {
            text: "A design pattern for object-oriented programming",
            isCorrect: false,
          },
          { text: "A method of sorting arrays in place", isCorrect: false },
        ],
      },
      {
        text: "What is the difference between HTTP and HTTPS?",
        options: [
          { text: "HTTPS is faster than HTTP", isCorrect: false },
          {
            text: "HTTPS encrypts data in transit using TLS/SSL; HTTP sends data in plain text",
            isCorrect: true,
          },
          {
            text: "HTTP supports only GET requests; HTTPS supports all methods",
            isCorrect: false,
          },
          {
            text: "They are identical — HTTPS is just a newer name",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is a RESTful API?",
        options: [
          { text: "An API that only works with JSON data", isCorrect: false },
          {
            text: "An API following REST constraints — stateless, resource-based URLs, standard HTTP methods",
            isCorrect: true,
          },
          {
            text: "An API built specifically for React applications",
            isCorrect: false,
          },
          {
            text: "An API that requires WebSocket connections",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the difference between SQL and NoSQL databases?",
        options: [
          {
            text: "SQL databases are slower; NoSQL are always faster",
            isCorrect: false,
          },
          {
            text: "SQL databases use structured tables with a fixed schema; NoSQL databases use flexible data models like documents or key-value pairs",
            isCorrect: true,
          },
          {
            text: "NoSQL databases cannot store relationships between data",
            isCorrect: false,
          },
          {
            text: "SQL is only for small projects; NoSQL is for large ones",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What is the purpose of version control (e.g. Git)?",
        options: [
          {
            text: "To automatically test code before deployment",
            isCorrect: false,
          },
          {
            text: "To track changes in code over time, collaborate with others, and revert to previous states",
            isCorrect: true,
          },
          { text: "To compile and bundle source code", isCorrect: false },
          {
            text: "To manage environment variables across machines",
            isCorrect: false,
          },
        ],
      },
      {
        text: "What does CORS stand for and why does it matter?",
        options: [
          {
            text: "Client Origin Resource Sharing — it controls how servers handle cookies",
            isCorrect: false,
          },
          {
            text: "Cross-Origin Resource Sharing — a browser security mechanism that restricts HTTP requests from one origin to another",
            isCorrect: true,
          },
          {
            text: "Cross-Origin Request Security — a Node.js module for encrypting API responses",
            isCorrect: false,
          },
          {
            text: "Content Origin Routing System — a CDN configuration protocol",
            isCorrect: false,
          },
        ],
      },
    ],
  },
];

async function main() {
  // -------------------------------------------------------------------
  // 1. Clean tables in correct order (children → parents)
  // -------------------------------------------------------------------
  await prisma.testResult.deleteMany();
  await prisma.answerOption.deleteMany();
  await prisma.question.deleteMany();
  await prisma.questionCategory.deleteMany();
  await prisma.review.deleteMany();
  await prisma.session.deleteMany();
  await prisma.mockupCard.deleteMany();
  await prisma.mentorTechStack.deleteMany();
  await prisma.mentorServiceType.deleteMany();
  await prisma.mentorProfile.deleteMany();
  await prisma.cvResult.deleteMany();
  await prisma.cvUpload.deleteMany();
  await prisma.user.deleteMany();

  // -------------------------------------------------------------------
  // 2. Hash password
  // -------------------------------------------------------------------
  const password = await bcrypt.hash("password123", 10);

  // -------------------------------------------------------------------
  // 3. Create mentors
  // -------------------------------------------------------------------
  const alex = await prisma.user.create({
    data: {
      email: "alex@example.com",
      name: "Alex Kovalenko",
      password,
      isMentor: true,
      bio: "Senior Frontend Developer with 6 years of experience. Helping juniors land their first interviews.",
      mentorProfile: {
        create: {
          position: "Senior Frontend Developer",
          description:
            "Conducted 200+ mock interviews. Specializing in React and TypeScript.",
          priceUsd: 30,
          contactInfo: "t.me/alex_kovalenko",
        },
      },
    },
  });

  const maria = await prisma.user.create({
    data: {
      email: "maria@example.com",
      name: "Maria Shevchenko",
      password,
      isMentor: true,
      bio: "Fullstack developer, Node.js + React. Passionate about helping with architecture.",
      mentorProfile: {
        create: {
          position: "Fullstack Developer",
          description:
            "Specializing in Node.js and API architecture. Code review and real-world problem solving.",
          priceUsd: 25,
          contactInfo: "t.me/maria_shev",
        },
      },
    },
  });

  const dmytro = await prisma.user.create({
    data: {
      email: "dmytro@example.com",
      name: "Dmytro Bondarenko",
      password,
      isMentor: true,
      bio: "DevOps engineer. AWS, Docker, CI/CD. Preparing candidates for interviews at product companies.",
      mentorProfile: {
        create: {
          position: "DevOps Engineer",
          description:
            "5 years in DevOps. Helping you understand Docker, k8s, GitHub Actions, and ace interviews.",
          priceUsd: 35,
          contactInfo: "t.me/dmytro_devops",
        },
      },
    },
  });

  const olena = await prisma.user.create({
    data: {
      email: "olena@example.com",
      name: "Olena Tkachuk",
      password,
      isMentor: true,
      bio: "React / Next.js developer. Helping with technical interview prep and code reviews.",
      mentorProfile: {
        create: {
          position: "Frontend Developer",
          description:
            "Working with Next.js App Router since its release. CV reviews and mock interviews.",
          priceUsd: 0,
          contactInfo: "t.me/olena_front",
        },
      },
    },
  });

  // -------------------------------------------------------------------
  // 4. Create students
  // -------------------------------------------------------------------
  const ivan = await prisma.user.create({
    data: {
      email: "student1@example.com",
      name: "Ivan Petrenko",
      password,
      isStudent: true,
      bio: "Learning frontend development, looking for my first job.",
    },
  });

  const kateryna = await prisma.user.create({
    data: {
      email: "student2@example.com",
      name: "Kateryna Melnyk",
      password,
      isStudent: true,
      bio: "Junior backend developer, aiming to reach mid-level within a year.",
    },
  });

  const serhii = await prisma.user.create({
    data: {
      email: "student3@example.com",
      name: "Serhii Kravchenko",
      password,
      isStudent: true,
    },
  });

  // -------------------------------------------------------------------
  // 5. Create marketplace cards
  // -------------------------------------------------------------------
  const alexCard1 = await prisma.mockupCard.create({
    data: {
      mentorId: alex.id,
      title: "JS Junior Interview",
      description:
        "Closures, prototypes, event loop. Typical junior-level JS interview questions.",
      techStack: ["JavaScript"],
      format: ["interview"],
      priceUsd: 30,
    },
  });

  const alexCard2 = await prisma.mockupCard.create({
    data: {
      mentorId: alex.id,
      title: "TypeScript Basics Mock",
      description:
        "Types, generics, utility types. Preparing for TS interview questions.",
      techStack: ["TypeScript"],
      format: ["interview"],
      priceUsd: 30,
    },
  });

  const mariaCard1 = await prisma.mockupCard.create({
    data: {
      mentorId: maria.id,
      title: "React Junior Mock Interview",
      description:
        "useState, useEffect, props, lifting state up — questions for a junior React role.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 25,
    },
  });

  const mariaCard2 = await prisma.mockupCard.create({
    data: {
      mentorId: maria.id,
      title: "Node.js REST API Mock",
      description:
        "Express, middleware, error handling, project structure. Junior/mid-level questions.",
      techStack: ["Node.js"],
      format: ["interview"],
      priceUsd: 25,
    },
  });

  const dmytroCard1 = await prisma.mockupCard.create({
    data: {
      mentorId: dmytro.id,
      title: "Docker Interview Prep",
      description:
        "Images, containers, volumes, networks, docker-compose — questions from real interviews.",
      techStack: ["Docker"],
      format: ["interview"],
      priceUsd: 35,
    },
  });

  const olenaCard1 = await prisma.mockupCard.create({
    data: {
      mentorId: olena.id,
      title: "React Junior: First Interview",
      description:
        "Simulated real interview for a junior position. Questions + feedback afterwards.",
      techStack: ["React"],
      format: ["interview"],
      priceUsd: 0,
    },
  });

  const olenaCard2 = await prisma.mockupCard.create({
    data: {
      mentorId: olena.id,
      title: "Next.js CV Review",
      description:
        "Reviewing a frontend developer CV with Next.js. Concrete, actionable feedback.",
      techStack: ["Next.js", "React"],
      format: ["cvreview"],
      priceUsd: 0,
    },
  });

  // Remaining cards (no sessions needed, just marketplace content)
  await prisma.mockupCard.createMany({
    data: [
      {
        mentorId: alex.id,
        title: "Async JS Deep Dive",
        description: "Promise, async/await, microtasks and macrotasks.",
        techStack: ["JavaScript"],
        format: ["interview"],
        priceUsd: 30,
      },
      {
        mentorId: alex.id,
        title: "JS Code Review",
        description:
          "Submit your JS code — readability, patterns, common mistakes.",
        techStack: ["JavaScript", "TypeScript"],
        format: ["codereview"],
        priceUsd: 20,
      },
      {
        mentorId: alex.id,
        title: "TS Advanced: Generics & Utility Types",
        description: "Conditional types, mapped types, infer.",
        techStack: ["TypeScript"],
        format: ["interview", "codereview"],
        priceUsd: 35,
      },
      {
        mentorId: alex.id,
        title: "CV Review for Frontend Junior",
        description:
          "CV breakdown: structure, wording, what to remove and what to add.",
        techStack: ["JavaScript", "TypeScript"],
        format: ["cvreview"],
        priceUsd: 15,
      },
      {
        mentorId: alex.id,
        title: "DOM & Browser APIs Mock",
        description: "Event delegation, MutationObserver, Web APIs.",
        techStack: ["JavaScript"],
        format: ["interview"],
        priceUsd: 30,
      },
      {
        mentorId: alex.id,
        title: "Functional JS Patterns",
        description: "Pure functions, immutability, compose/pipe.",
        techStack: ["JavaScript", "TypeScript"],
        format: ["interview", "codereview"],
        priceUsd: 30,
      },
      {
        mentorId: alex.id,
        title: "OOP in JavaScript",
        description: "Classes, prototypal inheritance, patterns.",
        techStack: ["JavaScript", "TypeScript"],
        format: ["interview"],
        priceUsd: 30,
      },
      {
        mentorId: alex.id,
        title: "Free Mock — JS Fundamentals",
        description: "30-minute trial interview. Basic JS questions only.",
        techStack: ["JavaScript"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: maria.id,
        title: "React Hooks Deep Dive",
        description: "useCallback, useMemo, useRef, custom hooks.",
        techStack: ["React"],
        format: ["interview"],
        priceUsd: 25,
      },
      {
        mentorId: maria.id,
        title: "Next.js App Router Mock",
        description: "Server vs Client components, layouts, loading, error.",
        techStack: ["Next.js"],
        format: ["interview"],
        priceUsd: 25,
      },
      {
        mentorId: maria.id,
        title: "React Code Review",
        description: "Send your component — architecture, hooks, optimization.",
        techStack: ["React", "TypeScript"],
        format: ["codereview"],
        priceUsd: 20,
      },
      {
        mentorId: maria.id,
        title: "Next.js Full-Stack Code Review",
        description: "Reviewing API routes, server components, data handling.",
        techStack: ["Next.js", "TypeScript"],
        format: ["codereview"],
        priceUsd: 25,
      },
      {
        mentorId: maria.id,
        title: "State Management Interview",
        description: "Context, Zustand, Redux Toolkit.",
        techStack: ["React", "TypeScript"],
        format: ["interview"],
        priceUsd: 25,
      },
      {
        mentorId: maria.id,
        title: "CV Review — Fullstack",
        description: "Reviewing a fullstack developer CV.",
        techStack: ["React", "Next.js", "Node.js"],
        format: ["cvreview"],
        priceUsd: 15,
      },
      {
        mentorId: maria.id,
        title: "React Performance Mock",
        description: "Reconciliation, memo, virtualization, profiler.",
        techStack: ["React"],
        format: ["interview"],
        priceUsd: 30,
      },
      {
        mentorId: maria.id,
        title: "Node.js Code Review",
        description: "Review of your Node.js project or API.",
        techStack: ["Node.js", "TypeScript"],
        format: ["codereview"],
        priceUsd: 20,
      },
      {
        mentorId: dmytro.id,
        title: "CI/CD Pipeline Mock",
        description: "GitHub Actions, GitLab CI — reviewing pipelines.",
        techStack: ["Docker", "GitHub Actions"],
        format: ["interview"],
        priceUsd: 35,
      },
      {
        mentorId: dmytro.id,
        title: "Docker Code Review",
        description: "Reviewing your Dockerfile and docker-compose.yml.",
        techStack: ["Docker"],
        format: ["codereview"],
        priceUsd: 30,
      },
      {
        mentorId: dmytro.id,
        title: "Node.js Performance Interview",
        description: "Event loop, streams, clustering, memory leaks.",
        techStack: ["Node.js"],
        format: ["interview"],
        priceUsd: 40,
      },
      {
        mentorId: dmytro.id,
        title: "DevOps CV Review",
        description: "Reviewing a DevOps/Backend engineer CV.",
        techStack: ["Docker", "Node.js"],
        format: ["cvreview"],
        priceUsd: 20,
      },
      {
        mentorId: dmytro.id,
        title: "Linux & Shell for Developers",
        description: "Basic commands, bash scripts, permissions.",
        techStack: ["Docker"],
        format: ["interview"],
        priceUsd: 35,
      },
      {
        mentorId: dmytro.id,
        title: "Node.js + Docker: Full Review",
        description: "Reviewing your Node.js project in Docker.",
        techStack: ["Node.js", "Docker"],
        format: ["codereview"],
        priceUsd: 40,
      },
      {
        mentorId: dmytro.id,
        title: "Free DevOps Q&A",
        description: "30 minutes of Q&A about the DevOps path.",
        techStack: ["Docker"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Next.js App Router: Code Review",
        description:
          "Project review on App Router — server components, layout, fetch.",
        techStack: ["Next.js", "TypeScript"],
        format: ["codereview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "React + TypeScript Interview",
        description: "Typing components, props, hooks.",
        techStack: ["React", "TypeScript"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Next.js + Prisma Code Review",
        description:
          "Reviewing how API routes, Prisma, and server logic are organized.",
        techStack: ["Next.js", "TypeScript"],
        format: ["codereview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Tailwind + React Code Review",
        description:
          "Reviewing component structure, styling approach, and reusability.",
        techStack: ["React"],
        format: ["codereview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Free Mock — React Basics",
        description:
          "Open mock interview for beginners. No stress, with a detailed debrief.",
        techStack: ["React"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "React Architecture Talk",
        description:
          "Discussing your project architecture: folders, components, layers.",
        techStack: ["React", "Next.js"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "CV Review — Frontend Beginner",
        description: "For those who haven't worked in IT yet.",
        techStack: ["React", "JavaScript"],
        format: ["cvreview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Next.js SSR vs SSG Interview",
        description: "getServerSideProps, generateStaticParams, revalidate.",
        techStack: ["Next.js"],
        format: ["interview"],
        priceUsd: 0,
      },
      {
        mentorId: olena.id,
        title: "Full Frontend Mock — Junior",
        description:
          "Full interview simulation: HTML/CSS, JS, React, project questions. 60 minutes.",
        techStack: ["JavaScript", "React", "TypeScript"],
        format: ["interview", "cvreview"],
        priceUsd: 0,
      },
    ],
  });

  // -------------------------------------------------------------------
  // 6. Create sessions
  // -------------------------------------------------------------------

  // Completed sessions — Ivan with Alex
  const session1 = await prisma.session.create({
    data: {
      studentId: ivan.id,
      cardId: alexCard1.id,
      studentLevel: "junior",
      goal: "Prepare for my first JS interview at a product company.",
      status: "completed",
    },
  });

  const session2 = await prisma.session.create({
    data: {
      studentId: ivan.id,
      cardId: alexCard2.id,
      studentLevel: "junior",
      goal: "Understand TypeScript generics and utility types.",
      status: "completed",
    },
  });

  // Completed sessions — Kateryna with Maria
  const session3 = await prisma.session.create({
    data: {
      studentId: kateryna.id,
      cardId: mariaCard1.id,
      studentLevel: "junior",
      goal: "Practice React hooks questions before an interview next week.",
      status: "completed",
    },
  });

  const session4 = await prisma.session.create({
    data: {
      studentId: kateryna.id,
      cardId: mariaCard2.id,
      studentLevel: "middle",
      goal: "Brush up on Node.js and Express architecture concepts.",
      status: "completed",
    },
  });

  // Completed session — Serhii with Dmytro
  const session5 = await prisma.session.create({
    data: {
      studentId: serhii.id,
      cardId: dmytroCard1.id,
      studentLevel: "junior",
      goal: "Learn Docker fundamentals and how to answer Docker interview questions.",
      status: "completed",
    },
  });

  // Completed sessions — Serhii and Ivan with Olena
  const session6 = await prisma.session.create({
    data: {
      studentId: serhii.id,
      cardId: olenaCard1.id,
      studentLevel: "junior",
      goal: "First ever mock interview. Just want to see how it goes.",
      status: "completed",
    },
  });

  const session7 = await prisma.session.create({
    data: {
      studentId: ivan.id,
      cardId: olenaCard2.id,
      studentLevel: "junior",
      goal: "Get feedback on my CV before applying to companies.",
      status: "completed",
    },
  });

  // Pending sessions — visible in mentor dashboards
  await prisma.session.create({
    data: {
      studentId: kateryna.id,
      cardId: alexCard1.id,
      studentLevel: "junior",
      goal: "Want to practice closures and async JS concepts.",
      preferredTime: "weekday evenings",
      status: "pending",
    },
  });

  await prisma.session.create({
    data: {
      studentId: serhii.id,
      cardId: mariaCard1.id,
      studentLevel: "middle",
      goal: "Preparing for a mid-level React position interview.",
      preferredTime: "weekend mornings",
      status: "pending",
    },
  });

  await prisma.session.create({
    data: {
      studentId: ivan.id,
      cardId: dmytroCard1.id,
      studentLevel: "junior",
      goal: "Need to understand Docker basics for a DevOps-adjacent role.",
      status: "pending",
    },
  });

  // -------------------------------------------------------------------
  // 7. Create reviews for completed sessions
  // -------------------------------------------------------------------

  // Ivan reviews Alex (session1, session2)
  await prisma.review.create({
    data: {
      sessionId: session1.id,
      authorId: ivan.id,
      rating: 5,
      text: "Alex was incredibly thorough. Covered all the key JS concepts and gave great feedback on my answers. Highly recommend!",
    },
  });

  await prisma.review.create({
    data: {
      sessionId: session2.id,
      authorId: ivan.id,
      rating: 5,
      text: "Finally understood generics thanks to Alex. Clear explanations and real interview questions.",
    },
  });

  // Kateryna reviews Maria (session3, session4)
  await prisma.review.create({
    data: {
      sessionId: session3.id,
      authorId: kateryna.id,
      rating: 5,
      text: "Maria is amazing. She explained React hooks in a way that finally clicked for me. Passed my interview!",
    },
  });

  await prisma.review.create({
    data: {
      sessionId: session4.id,
      authorId: kateryna.id,
      rating: 4,
      text: "Good session on Node.js concepts. Very practical and well-structured.",
    },
  });

  // Serhii reviews Dmytro (session5)
  await prisma.review.create({
    data: {
      sessionId: session5.id,
      authorId: serhii.id,
      rating: 5,
      text: "Dmytro knows Docker inside out. The session was dense but very informative. Worth every penny.",
    },
  });

  // Serhii reviews Olena (session6) — Ivan does NOT review session7 (no review = shows the button)
  await prisma.review.create({
    data: {
      sessionId: session6.id,
      authorId: serhii.id,
      rating: 5,
      text: "Olena was super supportive for my first mock interview. Great feedback and a calm atmosphere.",
    },
  });

  // -------------------------------------------------------------------
  // 8. Create question categories and questions
  // -------------------------------------------------------------------
  let totalQuestions = 0;

  for (const category of questionBank) {
    const createdCategory = await prisma.questionCategory.upsert({
      where: { slug: category.categorySlug },
      update: { name: category.categoryName },
      create: {
        name: category.categoryName,
        slug: category.categorySlug,
      },
    });

    for (const q of category.questions) {
      await prisma.question.create({
        data: {
          categoryId: createdCategory.id,
          text: q.text,
          options: {
            create: q.options,
          },
        },
      });
      totalQuestions++;
    }
  }

  console.log("✅ Seed complete:");
  console.log("   👤 4 mentors, 3 students");
  console.log("   🃏 40 marketplace cards");
  console.log("   📅 10 sessions (7 completed, 3 pending)");
  console.log("   ⭐ 6 reviews");
  console.log(
    `   📚 ${questionBank.length} categories, ${totalQuestions} questions`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
