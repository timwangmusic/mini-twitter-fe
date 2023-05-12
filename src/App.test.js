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

  const dropdown = screen.getByTestId('user-dropdown');
  expect(dropdown).toBeInTheDocument();
});
