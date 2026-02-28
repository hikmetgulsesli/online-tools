import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './page';

describe('Home Page', () => {
  it('renders main heading', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /ücretsiz online araçlar/i })).toBeInTheDocument();
  });

  it('renders all tool cards', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /qr kod oluşturucu/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /görsel sıkıştırma/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /şifre oluşturucu/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /base64 kodlayıcı/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /url kısaltıcı/i })).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    // Use getAllByRole since links appear in both header and footer
    expect(screen.getAllByRole('link', { name: /hakkımızda/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /^İletişim$/i }).length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByRole('link', { name: /gizlilik politikası/i }).length).toBeGreaterThanOrEqual(1);
  });

  it('renders footer', () => {
    render(<Home />);
    expect(screen.getByText(/tüm hakları saklıdır/i)).toBeInTheDocument();
  });
});
