/**
 * Google Analytics 4 � analytics utility
 *
 * This file has been completely stubbed out as Google Analytics and Tag Manager
 * have been entirely removed from the codebase. The empty functions remain so
 * that existing import statements do not cause build errors.
 */

export const GTM_ID: string | undefined = undefined;

export function initGA(): void {}
export function setConsent(granted: boolean): void {}
export function trackPageView(path: string, title?: string): void {}
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {}
