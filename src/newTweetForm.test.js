import { NewTweetForm } from "./newTweetForm";
import { fireEvent, render, screen } from '@testing-library/react';

test('the tweet post button is enabled after user starts typing', () => {
    render(<NewTweetForm user={{ name: 'guest' }} />);

    const newTweetInput = screen.getByTestId('tweet-text-input');
    expect(newTweetInput).toBeInTheDocument();

    const postButton = screen.getByTestId('tweet-post-btn');
    expect(postButton).toBeInTheDocument();
    expect(postButton.disabled).toBeTruthy();

    // changing the text input should enable the post button
    fireEvent.change(newTweetInput, { target: { value: 'good morning' } });
    expect(postButton.disabled).toBeFalsy();
})