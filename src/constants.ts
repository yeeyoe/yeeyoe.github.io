import IconGitHub from "@/assets/icons/IconGitHub.svg";
import IconMail from "@/assets/icons/IconMail.svg";
import { translateFor } from "@/i18n/utils";
import type { Props } from "astro";

type Translator = ReturnType<typeof translateFor>;

interface Social {
  name: string;
  href: string;
  linkTitle: (t: Translator) => string;
  icon: (_props: Props) => Element;
}

export const SOCIALS: Social[] = [
  {
    name: "Github",
    href: "https://github.com/yeeyoe/",
    linkTitle: (t: Translator) => t("socials.github"),
    icon: IconGitHub,
  },
  {
    name: "Mail",
    href: "mailto:yeeyoe@163.com",
    linkTitle: (t: Translator) => t("socials.mail"),
    icon: IconMail,
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: (t: Translator) => t("sharePost.via", { media: "Mail" }),
    icon: IconMail,
  },
] as const;
