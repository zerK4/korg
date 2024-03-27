"use client";

import anime from "animejs";
import numeral from "numeral";
import React, { useEffect, useRef, useState } from "react";

export function AnimatedNumbers({ amount }: { amount: number }) {
  const nrRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    anime({
      targets: nrRef.current,
      innerHTML: [0, amount],
      easing: "linear",
      round: 1,
      duration: 1500,
      update: function (a: any) {
        const value = a.animations[0].currentValue;
        const an = a.animatables[0].target;

        an.innerHTML = value.toLocaleString("ro-RO", {
          style: "currency",
          currency: "RON",
        });
      },
    });
  }, [amount]);
  return <span ref={nrRef}></span>;
}
