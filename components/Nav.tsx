'use client';

import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Nav = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const parallaxStyle = {
    background: `url('/images/parallax-bg.jpg') center/cover no-repeat fixed`, // Replace with your image path
    height: '300px',
    transform: `translateY(${scrollPosition * 0.5}px)`,
    position: 'relative',
    zIndex: -1,
  };

  return (
    <>
      <div style={parallaxStyle} />
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="/">My Task App</Navbar.Brand>
          {/* Add other navbar items here */}
        </Container>
      </Navbar>
    </>
  );
};

export default Nav;