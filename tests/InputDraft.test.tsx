import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputDraft from '../src/components/screens/InputDraft';

describe('InputDraft', () => {
  const mockOnUpdateDraft = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnDeleteDraft = jest.fn();
  const mockOnShowTemplate = jest.fn();

  const draft = {
    id: '1',
    title: 'Test Draft',
    // Add other properties as needed
  };

  it('renders without crashing', () => {
    render(
      <InputDraft
        draft={draft}
        onUpdateDraft={mockOnUpdateDraft}
        onCancel={mockOnCancel}
        onDeleteDraft={mockOnDeleteDraft}
        onShowTemplate={mockOnShowTemplate}
      />,
    );
  });

  it('calls onUpdateDraft when update button is clicked', () => {
    const { getByText } = render(
      <InputDraft
        draft={draft}
        onUpdateDraft={mockOnUpdateDraft}
        onCancel={mockOnCancel}
        onDeleteDraft={mockOnDeleteDraft}
        onShowTemplate={mockOnShowTemplate}
      />,
    );

    fireEvent.click(getByText('Update')); // Replace 'Update' with the actual text on your update button

    expect(mockOnUpdateDraft).toHaveBeenCalled();
  });

  // Add more tests as needed
});
