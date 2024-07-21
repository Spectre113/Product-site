import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '@/components/Footer';


  test('renders footer component', () => {
    render(<Footer />);
    const footerText = screen.getByText(/All rights reserved/i);
    expect(footerText).toBeInTheDocument();
    
  });

