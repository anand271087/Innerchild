import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Mail, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube 
} from 'lucide-react';
import { FooterSection } from './footer/FooterSection';
import { SocialLink } from './footer/SocialLink';
import { NewsletterForm } from './footer/NewsletterForm';

export default function Footer() {
  const quickLinks = [
    { name: '48-Day Healing', href: '/meditation-journey' },
    { name: 'Inner Child Assessment', href: '/assessment' },
    { name: 'Soul Chat', href: '/soul-chat' },
    { name: 'AI Life Story', href: '/ai-life-story' },
    { name: 'Energy Spaces Live', href: '/energy-spaces' }
  ];

  const resources = [
    { name: 'Healing Library', href: '/resources' },
    { name: 'Guided Meditations', href: '/meditations' },
    { name: 'Journal Prompts', href: '/journal-prompts' },
    { name: 'Success Stories', href: '/testimonials' },
    { name: 'FAQ', href: '/faq' }
  ];

  const support = [
    { name: 'Contact Us', href: '/contact' },
    { name: 'Help Center', href: '/help' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center">
              <Heart className="w-8 h-8 text-healing-ocean" />
              <span className="ml-2 text-2xl font-bold">InnerHeal</span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-sm">
              Embark on a transformative journey of inner child healing, guided by expert support and innovative tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <SocialLink href="#" icon={<Facebook />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter />} label="Twitter" />
              <SocialLink href="#" icon={<Instagram />} label="Instagram" />
              <SocialLink href="#" icon={<Youtube />} label="YouTube" />
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" links={quickLinks} />

          {/* Resources */}
          <FooterSection title="Resources" links={resources} />

          {/* Support */}
          <FooterSection title="Support" links={support} />
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold mb-4">Join Our Healing Community</h3>
            <p className="text-gray-600 mb-4">
              Get weekly insights, meditation guides, and healing resources delivered to your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} InnerHeal. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <Mail className="w-4 h-4 text-healing-ocean mr-2" />
            <a href="mailto:support@innerheal.com" className="text-sm text-gray-600 hover:text-healing-ocean">
              support@innerheal.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}