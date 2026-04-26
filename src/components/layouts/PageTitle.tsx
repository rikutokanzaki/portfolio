'use client';

import { useState, useEffect } from "react";
import { replaceText } from "@/utils/displayText";

type Props = {
  initialTitle: string;
  resultTitle: string;
}

export const PageTitle = ({ initialTitle, resultTitle }: Props) => {
  const [titleText, setTitleText] = useState(initialTitle);

  useEffect(() => {
    let isActive = true;

    const runReplaceText = async () => {
      await replaceText(initialTitle, resultTitle, (text) => {
        if (isActive) {
          setTitleText(text);
        }
      });
    };

    runReplaceText();

    return () => {
      isActive = false;
    };
  }, [initialTitle, resultTitle]);

  return (
    <h1 className="text-4xl">{titleText}</h1>
  );
}
