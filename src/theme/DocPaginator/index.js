import React from 'react';
import DocPaginator from '@theme-original/DocPaginator';
import Giscus from "@giscus/react";

export default function DocPaginatorWrapper(props) {
  return (
    <>
      <DocPaginator {...props} style={{marginBottom: "20px"}} />
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
