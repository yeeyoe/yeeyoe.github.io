import type { LocaleKey } from "@/i18n/config";
import { getCollection } from "astro:content";

/**
 * Retrieves the me page for a specific locale.
 *
 * @param locale - The locale to retrieve me page content for.
 * @returns Promise resolving to the me page entry for the specified locale or undefined if not found.
 */
export const getMeForLocale = async (locale: string) => {
  const entries = await getCollection("me");
  return entries.find(entry => entry.id === locale);
};

export const getResearchForLocale = async (locale: LocaleKey) => {
  const entries = await getCollection("research");
  return entries.find(entry => entry.id === locale);
};

export const getTeachForLocale = async (locale: LocaleKey) => {
  const entries = await getCollection("teach");
  return entries.find(entry => entry.id === locale);
};

export const getCodeForLocale = async (locale: LocaleKey) => {
  const entries = await getCollection("code");
  return entries.find(entry => entry.id === locale);
};
