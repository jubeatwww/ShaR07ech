import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import Giscus from "@giscus/react";

export default function MDXContentWrapper(props) {
  return (
    <>
      <MDXContent {...props} />
      <Giscus
        id="comments"
        repo="jubeatwww/ShaR07ech"
        repoId="R_kgDOLs1k2A"
        category="Announcements"
        categoryId="DIC_kwDOLs1k2M4Cez-9"
        mapping="pathname"
        term="Welcome to @giscus/react component!"
        reactionsEnabled="1"
        strict="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang="zh-TW"
        loading="lazy"/>
    </>
  );
}
