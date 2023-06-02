/* eslint-disable @next/next/no-img-element */
'use client';

import { UserButton, useUser } from '@clerk/nextjs';
import { Dialog, Popover, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Fragment, useState } from 'react';

const navigation = {
  pages: [
    { name: 'About Us', href: 'about' },
    { name: 'Pricing', href: '/pricing' },
  ],
};

export default function Example() {
  const [open, setOpen] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
                <div className='flex px-4 pb-2 pt-5'>
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                  </button>
                </div>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className='flow-root'>
                      <a
                        href={page.href}
                        className='-m-2 block p-2 font-medium text-gray-900'
                      >
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Sign In
                    </a>
                  </div>
                  <div className='flow-root'>
                    <a
                      href='#'
                      className='-m-2 block p-2 font-medium text-gray-900'
                    >
                      Sign Up
                    </a>
                  </div>
                </div>

                <div className='border-t border-gray-200 px-4 py-6'>
                  <a href='#' className='-m-2 flex items-center p-2'>
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-base font-medium text-gray-900'>
                      ZAR
                    </span>
                    <span className='sr-only'>, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='relative overflow-hidden'>
        {/* Top navigation */}
        <nav
          aria-label='Top'
          className='relative z-20 bg-white bg-opacity-90 backdrop-blur-xl backdrop-filter'
        >
          <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center'>
              <button
                type='button'
                className='rounded-md bg-white p-2 text-gray-400 lg:hidden'
                onClick={() => setOpen(true)}
              >
                <span className='sr-only'>Open menu</span>
                <Bars3Icon className='h-6 w-6' aria-hidden='true' />
              </button>

              {/* Logo */}
              <div className='ml-2 flex lg:ml-0'>
                <a href='#'>
                  <span className='sr-only'>Your Company</span>
                  <img className='h-8 w-auto' src='/logo.png' alt='' />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      href={page.href}
                      className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className='ml-auto flex items-center'>
                {!isSignedIn && isLoaded && (
                  <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                    <a
                      href='/sign-in'
                      className='text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      Sign In
                    </a>

                    <span className='h-6 w-px bg-gray-200' aria-hidden='true' />
                    <a
                      href='/sign-up'
                      className='text-sm font-medium text-gray-700 hover:text-gray-800'
                    >
                      Sign Up
                    </a>
                  </div>
                )}

                <div className='hidden lg:ml-8 lg:flex'>
                  <a
                    href='#'
                    className='flex items-center text-gray-700 hover:text-gray-800'
                  >
                    <img
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      alt=''
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-sm font-medium'>CAD</span>
                    <span className='sr-only'>, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <a href='#' className='p-2 text-gray-400 hover:text-gray-500'>
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      className='h-6 w-6'
                      aria-hidden='true'
                    />
                  </a>
                </div>

                {/* Cart */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <a href='#' className='group -m-2 flex items-center p-2'>
                    <ShoppingBagIcon
                      className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
                      0
                    </span>
                    <span className='sr-only'>items in cart, view bag</span>
                  </a>
                </div>
                {/* profile */}
                <div className='ml-4 flow-root lg:ml-6'>
                  <UserButton afterSignOutUrl='/' />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero section */}
        <div className='pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40'>
          <div className='relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8'>
            <div className='sm:max-w-lg'>
              <h1 className='font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
                Style Me - Style by AI
              </h1>
              <p className='mt-4 text-xl text-gray-500'>
                This year, our new summer collection will shelter you from the
                harsh elements of a world that doesn't care if you live or die.
              </p>
            </div>
            <div>
              <div className='mt-10'>
                {/* Decorative image grid */}
                <div
                  aria-hidden='true'
                  className='pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl'
                >
                  <div className='absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8'>
                    <div className='flex items-center space-x-6 lg:space-x-8'>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                      <div className='grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8'>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                        <div className='h-64 w-44 overflow-hidden rounded-lg'>
                          <img
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg'
                            alt=''
                            className='h-full w-full object-cover object-center'
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href='#'
                  className='inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700'
                >
                  Style Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Category section */}

        {/* Featured section */}
        <section aria-labelledby='cause-heading'>
          <div className='relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16'>
            <div className='absolute inset-0 overflow-hidden'>
              <img
                src='https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg'
                alt=''
                className='h-full w-full object-cover object-center'
              />
            </div>
            <div
              aria-hidden='true'
              className='absolute inset-0 bg-gray-900 bg-opacity-50'
            />
            <div className='relative mx-auto flex max-w-3xl flex-col items-center text-center'>
              <h2
                id='cause-heading'
                className='text-3xl font-bold tracking-tight text-white sm:text-4xl'
              >
                Long-term thinking
              </h2>
              <p className='mt-3 text-xl text-white'>
                Discover the Essence of African Fashion: Style Me takes you on a
                captivating journey through the rich tapestry of African
                fashion. From traditional attire to contemporary designs, the
                app showcases the unique styles, colours, and patterns that
                reflect the cultural heritage of various African countries.
                Embrace the beauty of African fashion and unleash your
                individuality.
              </p>
              <a
                href='#'
                className='mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto'
              >
                Read our story
              </a>
            </div>
          </div>
        </section>

        {/* Favorites section */}

        {/* CTA section */}
        <section aria-labelledby='sale-heading'>
          <div className='overflow-hidden pt-32 sm:pt-14'>
            <div className='bg-gray-800'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='relative pb-16 pt-48 sm:pb-24'>
                  <div>
                    <h2
                      id='sale-heading'
                      className='text-4xl font-bold tracking-tight text-white md:text-5xl'
                    >
                      50 credits for new user
                      <br />
                      15 credits each month there after
                    </h2>
                    <div className='mt-6 text-base'>
                      <a href='#' className='font-semibold text-white'>
                        Style Me
                        <span aria-hidden='true'> &rarr;</span>
                      </a>
                    </div>
                  </div>

                  <div className='absolute -top-32 left-1/2 -translate-x-1/2 transform sm:top-6 sm:translate-x-0'>
                    <div className='ml-24 flex min-w-max space-x-6 sm:ml-3 lg:space-x-8'>
                      <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='flex space-x-6 sm:-mt-20 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                      <div className='flex space-x-6 sm:flex-col sm:space-x-0 sm:space-y-6 lg:space-y-8'>
                        <div className='flex-shrink-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-01.jpg'
                            alt=''
                          />
                        </div>

                        <div className='mt-6 flex-shrink-0 sm:mt-0'>
                          <img
                            className='h-64 w-64 rounded-lg object-cover md:h-72 md:w-72'
                            src='https://tailwindui.com/img/ecommerce-images/home-page-03-category-02.jpg'
                            alt=''
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer aria-labelledby='footer-heading' className='bg-white'>
        <h2 id='footer-heading' className='sr-only'>
          Footer
        </h2>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='border-t border-gray-200 py-10'>
            <p className='text-sm text-gray-500'>
              Copyright &copy; 2021 Style Me, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
