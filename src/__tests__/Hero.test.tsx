import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../../components/Hero';

  test('renders hero component', () => {
    render(<Hero />);

    const titleElement = screen.getByText(/Want something tasty?/i);
    expect(titleElement).toBeInTheDocument();
    
  });

