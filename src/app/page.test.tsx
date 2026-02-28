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
    expect(screen.getByText('QR Kod Oluşturucu')).toBeInTheDocument();
    expect(screen.getByText('Görüntü Sıkıştırıcı')).toBeInTheDocument();
    expect(screen.getByText('Şifre Oluşturucu')).toBeInTheDocument();
    expect(screen.getByText('Base64 Kodlayıcı')).toBeInTheDocument();
    expect(screen.getByText('URL Kısaltıcı')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Home />);
    expect(screen.getByText('Hakkımızda')).toBeInTheDocument();
    expect(screen.getByText('İletişim')).toBeInTheDocument();
    expect(screen.getByText('Gizlilik')).toBeInTheDocument();
  });

  it('renders footer', () => {
    render(<Home />);
    expect(screen.getByText(/tüm hakları saklıdır/i)).toBeInTheDocument();
  });
});
