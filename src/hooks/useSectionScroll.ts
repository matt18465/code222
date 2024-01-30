import React from "react";

export const useSectionScroll = (sections: string[]) => {
  const [sectionToScroll, setSectionToScroll] = React.useState<string | null>(
    null
  );

  type SectionRefsType = {
    [key: string]: React.RefObject<HTMLDivElement>;
  };
  const sectionRefs = React.useRef<SectionRefsType>({});

  sections.forEach((sectionTitle) => {
    if (!sectionRefs.current[sectionTitle]) {
      sectionRefs.current[sectionTitle] = React.createRef();
    }
  });

  React.useEffect(() => {
    if (sectionToScroll) {
      sectionRefs.current[sectionToScroll]?.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [sectionToScroll]);

  return { setSectionToScroll, sectionRefs };
};
