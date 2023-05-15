import { render, screen } from '@testing-library/react';
import App from './App';
import nock from 'nock';

test('renders basic components', async () => {
  nock('http://localhost').get("/tweets/guest")
    .reply(
      200, {
      tweets: []
    }
    )

  render(<App />);
  const appTitle = screen.getByRole('heading', { name: /Mini Twitter/i });
  expect(appTitle).toBeInTheDocument();

  const timelineLink = screen.getByRole('link', { name: /timeline/i });
  expect(timelineLink).toBeInTheDocument();

  const signupLink = screen.getByRole('link', { name: /signup/i });
  expect(signupLink).toBeInTheDocument();
});
