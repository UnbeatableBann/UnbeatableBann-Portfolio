import { useEffect, useRef } from 'react';
import { useRouterState } from '@tanstack/react-router';
import { trackEvent } from '@/lib/analytics';

export function AnalyticsEngine() {
  const routerState = useRouterState();
  const location = routerState.location;
  
  const timeOnPageRef = useRef<NodeJS.Timeout[]>([]);
  const scrollMilestones = useRef(new Set<number>());

  useEffect(() => {
    // 1. Page View Tracking (GA4 does this, but we can do a custom one or just reset state)
    trackEvent('page_view', { page_name: location.pathname });

    // Reset page-level trackers
    scrollMilestones.current.clear();
    timeOnPageRef.current.forEach(clearTimeout);
    timeOnPageRef.current = [];

    // 2. Time on Page milestones
    const milestones = [30, 60, 120, 300];
    milestones.forEach(seconds => {
      const timeout = setTimeout(() => {
        trackEvent('time_on_page', {
          duration_seconds: seconds,
          page_name: location.pathname
        });
      }, seconds * 1000);
      timeOnPageRef.current.push(timeout);
    });

    // 3. Scroll Tracking
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollY = window.scrollY;
      const scrollPercent = (scrollY / scrollHeight) * 100;
      
      const targets = [25, 50, 75, 100];
      targets.forEach(target => {
        if (scrollPercent >= target && !scrollMilestones.current.has(target)) {
          scrollMilestones.current.add(target);
          trackEvent('scroll_depth', {
            percent: target,
            page_name: location.pathname
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 4. Recruiter Signals - Update session state
    const currentSessionsStr = sessionStorage.getItem('recruiter_signals') || '{}';
    const sessionData = JSON.parse(currentSessionsStr);
    
    // Check return within 7 days
    const lastVisit = localStorage.getItem('last_visit_timestamp');
    const now = Date.now();
    if (lastVisit) {
      const daysSince = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
      if (daysSince > 0.5 && daysSince <= 7 && !sessionData.returned_7_days) {
        sessionData.returned_7_days = true;
        trackEvent('recruiter_signal', { signal_type: 'return_within_7_days' });
      }
    }
    localStorage.setItem('last_visit_timestamp', now.toString());

    // Check referral
    if (document.referrer && !sessionData.referral_checked) {
      sessionData.referral_checked = true;
      if (document.referrer.includes('linkedin.com')) {
        trackEvent('recruiter_signal', { signal_type: 'linkedin_referral' });
      } else if (document.referrer.includes('github.com')) {
        trackEvent('recruiter_signal', { signal_type: 'github_referral' });
      } else if (document.referrer.includes('google.com')) {
        trackEvent('recruiter_signal', { signal_type: 'google_search_referral' });
      }
    }
    
    sessionStorage.setItem('recruiter_signals', JSON.stringify(sessionData));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      timeOnPageRef.current.forEach(clearTimeout);
    };
  }, [location.pathname]);

  // Global Error Tracking
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent('unexpected_error', { error_message: event.reason?.message || 'Promise Rejection' });
    };
    
    const handleWindowError = (event: ErrorEvent) => {
      trackEvent('unexpected_error', { error_message: event.message });
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleWindowError);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleWindowError);
    };
  }, []);

  return null;
}
