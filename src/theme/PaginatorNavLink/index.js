import React from 'react';
import PaginatorNavLink from '@theme-original/PaginatorNavLink';

export default function PaginatorNavLinkWrapper(props) {
  const formattedTitle = props.title.replace(/[^a-zA-Z0-9.\s]/g, '');
  return (
    <>
      <PaginatorNavLink {...props} title={formattedTitle} />
    </>
  );
}
