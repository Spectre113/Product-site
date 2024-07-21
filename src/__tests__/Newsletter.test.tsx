import React from 'react';
import { render, screen } from '@testing-library/react';
import Newsletter from '@/components/NewsLetter';

  test('renders newsletter component', () => {
    render(<Newsletter />);

    const titleElement = screen.getByText(/Newsletter/i);
    expect(titleElement).toBeInTheDocument();
    
  });

