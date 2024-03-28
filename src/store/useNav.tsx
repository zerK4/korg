import anime from "animejs";
import { create } from "zustand";

export interface IUseNav {
  goTo: string;
  switchPage: ({
    router,
    pageName,
    href,
  }: {
    e: any;
    router: any;
    pageName: string;
    href: string;
  }) => void;
}

export const useNav = create<IUseNav>((set, get) => ({
  goTo: "",
  switchPage: ({ e, router, pageName, href }) => {
    e.preventDefault();
    const tl = anime.timeline();
    set({ goTo: pageName });

    tl.add({
      targets: ".anime-page-switcher",
      height: [0, "100vh"],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeInOutExpo",
      complete: () => {
        router.push(href);
      },
    }).add({
      targets: ".anime-page-switcher",
      opacity: [1, 0],
      translateY: [0, "-150vh"],
      duration: 1000,
      easing: "easeInOutExpo",
    });
  },
}));
