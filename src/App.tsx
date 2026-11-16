import { useCallback, useEffect, useState } from 'react';
import { ClosingSummaryView } from './components/ClosingSummaryView';
import { Layout } from './components/Layout';
import { ModulePage } from './components/ModulePage';
import { useHashRoute } from './lib/router';

const INSTRUCTOR_MODE_STORAGE_KEY = 'saas_instructor_mode_v1';

function readInitialInstructorMode(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return window.sessionStorage.getItem(INSTRUCTOR_MODE_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function App() {
  const route = useHashRoute();
  const [projectorMode, setProjectorMode] = useState(false);
  const [instructorMode, setInstructorMode] = useState<boolean>(readInitialInstructorMode);

  const unlockInstructorMode = useCallback(() => {
    setInstructorMode(true);
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.setItem(INSTRUCTOR_MODE_STORAGE_KEY, '1');
      } catch {
        // Ignore sessionStorage write errors in restricted browsing modes
      }
    }
  }, []);

  const lockInstructorMode = useCallback(() => {
    setInstructorMode(false);
    setProjectorMode(false);
    if (typeof window !== 'undefined') {
      try {
        window.sessionStorage.removeItem(INSTRUCTOR_MODE_STORAGE_KEY);
      } catch {
        // Ignore sessionStorage removal errors in restricted browsing modes
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (projectorMode) {
      root.classList.add('projector');
    } else {
      root.classList.remove('projector');
    }
    return () => {
      root.classList.remove('projector');
    };
  }, [projectorMode]);

  return (
    <Layout
      route={route}
      projectorMode={projectorMode}
      instructorMode={instructorMode}
      onToggleProjector={() => setProjectorMode((prev) => !prev)}
      onExitProjector={() => setProjectorMode(false)}
      onUnlockInstructor={unlockInstructorMode}
      onLockInstructor={lockInstructorMode}
    >
      {route.view === 'penutup' ? (
        <ClosingSummaryView instructorMode={instructorMode} />
      ) : (
        <ModulePage
          moduleId={route.moduleId}
          tab={route.tab}
          projectorMode={projectorMode}
          instructorMode={instructorMode}
        />
      )}
    </Layout>
  );
}

export default App;
