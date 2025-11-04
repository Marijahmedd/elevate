import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=1537c862"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/node_modules/.vite/deps/react.js?v=1537c862"; const StrictMode = __vite__cjsImport1_react["StrictMode"];
import __vite__cjsImport2_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=044f86d7"; const createRoot = __vite__cjsImport2_reactDom_client["createRoot"];
import { BrowserRouter, Route, Routes } from "/node_modules/.vite/deps/react-router-dom.js?v=bc242798";
import "/src/index.css?t=1762206550747";
import { GoogleOAuthProvider } from "/node_modules/.vite/deps/@react-oauth_google.js?v=86caad82";
import ProtectedRoute from "/src/components/ProtectedRoute.tsx?t=1762206550747";
import JobListing from "/src/pages/job-listing/JobListing.tsx?t=1762206550747";
import { QueryClient, QueryClientProvider } from "/node_modules/.vite/deps/@tanstack_react-query.js?v=7e386676";
import JobListingLayout from "/src/layouts/JobListingLayout.tsx?t=1762206550747";
import UserLayout from "/src/layouts/UserLayout.tsx?t=1762206550747";
import Profile from "/src/pages/profile/Profile.tsx?t=1762206550747";
import RecruiterRoute from "/src/components/RecruiterRoute.tsx?t=1762206550747";
import RecruiterDashboard from "/src/pages/recruiter/RecruiterDashboard.tsx?t=1762206550747";
import RecruiterRegister from "/src/pages/recruiter/register-recruiter/RecruiterRegister.tsx?t=1762206550747";
import RecruiterLayout from "/src/layouts/RecruiterLayout.tsx?t=1762206550747";
import AiSearch from "/src/pages/ai-search/AiSearch.tsx";
import RecruiterJobDetails from "/src/pages/recruiter/job-details/JobDetails.tsx?t=1762206550747";
import RecruiterJobCreate from "/src/pages/recruiter/create-job/RecruiterJobCreate.tsx?t=1762206550747";
import Home from "/src/pages/home/Home.tsx";
export const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(GoogleOAuthProvider, { clientId: "848342217121-rtfr8987cd6qboig7loc2gm7dk7ugv4k.apps.googleusercontent.com", children: /* @__PURE__ */ jsxDEV(StrictMode, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxDEV(BrowserRouter, { children: /* @__PURE__ */ jsxDEV(Routes, { children: [
    /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(ProtectedRoute, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 30,
      columnNumber: 29
    }, this), children: /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(UserLayout, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 31,
      columnNumber: 31
    }, this), children: [
      /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(Profile, {}, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 32,
        columnNumber: 33
      }, this), path: "profile" }, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 32,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterRegister, {}, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 34,
        columnNumber: 33
      }, this), path: "recruiter/register" }, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 34,
        columnNumber: 17
      }, this)
    ] }, void 0, true, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 31,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 30,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(UserLayout, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 38,
      columnNumber: 29
    }, this), children: /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(AiSearch, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 39,
      columnNumber: 31
    }, this), path: "ai-search" }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 39,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 38,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(JobListingLayout, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 42,
      columnNumber: 29
    }, this), children: /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(JobListing, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 43,
      columnNumber: 31
    }, this), path: "jobs" }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 43,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 42,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 47,
      columnNumber: 29
    }, this), path: "/" }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 47,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(ProtectedRoute, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 50,
      columnNumber: 29
    }, this), children: /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterRoute, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 51,
      columnNumber: 31
    }, this), children: /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterLayout, {}, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 52,
      columnNumber: 33
    }, this), children: [
      /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterDashboard, {}, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 53,
        columnNumber: 35
      }, this), path: "recruiter" }, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 53,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterJobCreate, {}, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 54,
        columnNumber: 35
      }, this), path: "recruiter/jobs/new" }, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 54,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV(Route, { element: /* @__PURE__ */ jsxDEV(RecruiterJobDetails, {}, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 56,
        columnNumber: 35
      }, this), path: "recruiter/jobs/:jobId" }, void 0, false, {
        fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
        lineNumber: 56,
        columnNumber: 19
      }, this)
    ] }, void 0, true, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 52,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 51,
      columnNumber: 15
    }, this) }, void 0, false, {
      fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
      lineNumber: 50,
      columnNumber: 13
    }, this)
  ] }, void 0, true, {
    fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
    lineNumber: 28,
    columnNumber: 11
  }, this) }, void 0, false, {
    fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
    lineNumber: 27,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
    lineNumber: 26,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this) }, void 0, false, {
    fileName: "/home/baysick/Desktop/elevate/react-frontend/src/main.tsx",
    lineNumber: 24,
    columnNumber: 3
  }, this)
);

//# sourceMappingURL=data:application/json;base64,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YUFBbUIsR0FBSyxNQUFLLHdCQUE3QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWlFO0FBQUEsTUFFakUsdUJBQUMsU0FBTSxTQUFTLHVCQUFDLHlCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBb0IsR0FBSyxNQUFLLDJCQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQXFFO0FBQUEsU0FKdkU7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUtBLEtBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQU9BLEtBUkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQVNBO0FBQUEsT0EvQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWdDQSxLQWpDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBa0NBLEtBbkNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FvQ0EsS0FyQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXNDQSxLQXZDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBd0NBO0FBQ0YiLCJuYW1lcyI6WyJTdHJpY3RNb2RlIiwiY3JlYXRlUm9vdCIsIkJyb3dzZXJSb3V0ZXIiLCJSb3V0ZSIsIlJvdXRlcyIsIkdvb2dsZU9BdXRoUHJvdmlkZXIiLCJQcm90ZWN0ZWRSb3V0ZSIsIkpvYkxpc3RpbmciLCJRdWVyeUNsaWVudCIsIlF1ZXJ5Q2xpZW50UHJvdmlkZXIiLCJKb2JMaXN0aW5nTGF5b3V0IiwiVXNlckxheW91dCIsIlByb2ZpbGUiLCJSZWNydWl0ZXJSb3V0ZSIsIlJlY3J1aXRlckRhc2hib2FyZCIsIlJlY3J1aXRlclJlZ2lzdGVyIiwiUmVjcnVpdGVyTGF5b3V0IiwiQWlTZWFyY2giLCJSZWNydWl0ZXJKb2JEZXRhaWxzIiwiUmVjcnVpdGVySm9iQ3JlYXRlIiwiSG9tZSIsInF1ZXJ5Q2xpZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInJlbmRlciJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlcyI6WyJtYWluLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpY3RNb2RlIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCdcbmltcG9ydCB7IEJyb3dzZXJSb3V0ZXIsIFJvdXRlLCBSb3V0ZXMgfSBmcm9tICdyZWFjdC1yb3V0ZXItZG9tJ1xuaW1wb3J0ICcuL2luZGV4LmNzcydcbmltcG9ydCB7IEdvb2dsZU9BdXRoUHJvdmlkZXIgfSBmcm9tICdAcmVhY3Qtb2F1dGgvZ29vZ2xlJ1xuaW1wb3J0IFByb3RlY3RlZFJvdXRlIGZyb20gJy4vY29tcG9uZW50cy9Qcm90ZWN0ZWRSb3V0ZS50c3gnXG5pbXBvcnQgSm9iTGlzdGluZyBmcm9tICcuL3BhZ2VzL2pvYi1saXN0aW5nL0pvYkxpc3RpbmcudHN4J1xuaW1wb3J0IHsgUXVlcnlDbGllbnQsIFF1ZXJ5Q2xpZW50UHJvdmlkZXIgfSBmcm9tICdAdGFuc3RhY2svcmVhY3QtcXVlcnknXG5pbXBvcnQgSm9iTGlzdGluZ0xheW91dCBmcm9tICcuL2xheW91dHMvSm9iTGlzdGluZ0xheW91dC50c3gnXG5pbXBvcnQgVXNlckxheW91dCBmcm9tICcuL2xheW91dHMvVXNlckxheW91dC50c3gnXG5pbXBvcnQgUHJvZmlsZSBmcm9tICcuL3BhZ2VzL3Byb2ZpbGUvUHJvZmlsZS50c3gnXG5pbXBvcnQgUmVjcnVpdGVyUm91dGUgZnJvbSAnLi9jb21wb25lbnRzL1JlY3J1aXRlclJvdXRlLnRzeCdcbmltcG9ydCBSZWNydWl0ZXJEYXNoYm9hcmQgZnJvbSAnLi9wYWdlcy9yZWNydWl0ZXIvUmVjcnVpdGVyRGFzaGJvYXJkLnRzeCdcbmltcG9ydCBSZWNydWl0ZXJSZWdpc3RlciBmcm9tICcuL3BhZ2VzL3JlY3J1aXRlci9yZWdpc3Rlci1yZWNydWl0ZXIvUmVjcnVpdGVyUmVnaXN0ZXIudHN4J1xuaW1wb3J0IFJlY3J1aXRlckxheW91dCBmcm9tICcuL2xheW91dHMvUmVjcnVpdGVyTGF5b3V0LnRzeCdcbmltcG9ydCBBaVNlYXJjaCBmcm9tICcuL3BhZ2VzL2FpLXNlYXJjaC9BaVNlYXJjaC50c3gnXG5pbXBvcnQgUmVjcnVpdGVySm9iRGV0YWlscyBmcm9tICcuL3BhZ2VzL3JlY3J1aXRlci9qb2ItZGV0YWlscy9Kb2JEZXRhaWxzLnRzeCdcbmltcG9ydCBSZWNydWl0ZXJKb2JDcmVhdGUgZnJvbSAnLi9wYWdlcy9yZWNydWl0ZXIvY3JlYXRlLWpvYi9SZWNydWl0ZXJKb2JDcmVhdGUudHN4J1xuaW1wb3J0IEhvbWUgZnJvbSAnLi9wYWdlcy9ob21lL0hvbWUudHN4J1xuXG5cbmV4cG9ydCBjb25zdCBxdWVyeUNsaWVudCA9IG5ldyBRdWVyeUNsaWVudCgpXG5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykhKS5yZW5kZXIoXG4gIDxHb29nbGVPQXV0aFByb3ZpZGVyIGNsaWVudElkPVwiODQ4MzQyMjE3MTIxLXJ0ZnI4OTg3Y2Q2cWJvaWc3bG9jMmdtN2RrN3VndjRrLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tXCI+XG4gICAgPFN0cmljdE1vZGU+XG4gICAgICA8UXVlcnlDbGllbnRQcm92aWRlciBjbGllbnQ9e3F1ZXJ5Q2xpZW50fT5cbiAgICAgICAgPEJyb3dzZXJSb3V0ZXI+XG4gICAgICAgICAgPFJvdXRlcz5cblxuICAgICAgICAgICAgPFJvdXRlIGVsZW1lbnQ9ezxQcm90ZWN0ZWRSb3V0ZSAvPn0+XG4gICAgICAgICAgICAgIDxSb3V0ZSBlbGVtZW50PXs8IFVzZXJMYXlvdXQgLz59PlxuICAgICAgICAgICAgICAgIDxSb3V0ZSBlbGVtZW50PXs8UHJvZmlsZSAvPn0gcGF0aD0ncHJvZmlsZScgLz5cblxuICAgICAgICAgICAgICAgIDxSb3V0ZSBlbGVtZW50PXs8UmVjcnVpdGVyUmVnaXN0ZXIgLz59IHBhdGg9J3JlY3J1aXRlci9yZWdpc3RlcicgLz5cbiAgICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICAgIDwvUm91dGU+XG5cbiAgICAgICAgICAgIDxSb3V0ZSBlbGVtZW50PXs8IFVzZXJMYXlvdXQgLz59PlxuICAgICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PEFpU2VhcmNoIC8+fSBwYXRoPSdhaS1zZWFyY2gnIC8+XG4gICAgICAgICAgICA8L1JvdXRlPlxuXG4gICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PCBKb2JMaXN0aW5nTGF5b3V0IC8+fT5cbiAgICAgICAgICAgICAgPFJvdXRlIGVsZW1lbnQ9ezxKb2JMaXN0aW5nIC8+fSBwYXRoPSdqb2JzJyAvPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cblxuXG4gICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PEhvbWUgLz59IHBhdGg9Jy8nIC8+XG5cblxuICAgICAgICAgICAgPFJvdXRlIGVsZW1lbnQ9ezwgUHJvdGVjdGVkUm91dGUgLz59PlxuICAgICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PCBSZWNydWl0ZXJSb3V0ZSAvPn0+XG4gICAgICAgICAgICAgICAgPFJvdXRlIGVsZW1lbnQ9ezwgUmVjcnVpdGVyTGF5b3V0IC8+fT5cbiAgICAgICAgICAgICAgICAgIDxSb3V0ZSBlbGVtZW50PXs8UmVjcnVpdGVyRGFzaGJvYXJkIC8+fSBwYXRoPSdyZWNydWl0ZXInIC8+XG4gICAgICAgICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PFJlY3J1aXRlckpvYkNyZWF0ZSAvPn0gcGF0aD0ncmVjcnVpdGVyL2pvYnMvbmV3JyAvPlxuXG4gICAgICAgICAgICAgICAgICA8Um91dGUgZWxlbWVudD17PFJlY3J1aXRlckpvYkRldGFpbHMgLz59IHBhdGg9J3JlY3J1aXRlci9qb2JzLzpqb2JJZCcgLz5cbiAgICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICA8L1JvdXRlcz5cbiAgICAgICAgPC9Ccm93c2VyUm91dGVyPlxuICAgICAgPC9RdWVyeUNsaWVudFByb3ZpZGVyPlxuICAgIDwvU3RyaWN0TW9kZT5cbiAgPC9Hb29nbGVPQXV0aFByb3ZpZGVyID4sXG4pXG4iXSwiZmlsZSI6Ii9ob21lL2JheXNpY2svRGVza3RvcC9lbGV2YXRlL3JlYWN0LWZyb250ZW5kL3NyYy9tYWluLnRzeCJ9