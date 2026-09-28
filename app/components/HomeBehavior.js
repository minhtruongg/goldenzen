'use client'

import { useEffect } from 'react'
import { LANG } from './homeLang'

// Client-side behaviour of the homepage (scroll reveal, parallax, language toggle, mobile menu).
// The markup itself is rendered on the server in app/page.js.
export default function HomeBehavior() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => observer.observe(el))

    const nav = document.getElementById('nav')
    const heroImg = document.querySelector('#heroBg img')
    const onScroll = () => {
      const y = window.scrollY
      if (heroImg) heroImg.style.transform = `translateY(${y * 0.35}px)`
      if (nav) nav.classList.toggle('scrolled', y > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const setLang = (l) => {
      document.getElementById('lb-cs').className = 'lb' + (l === 'cs' ? ' a' : '')
      document.getElementById('lb-en').className = 'lb' + (l === 'en' ? ' a' : '')
      for (const [id, val] of Object.entries(LANG[l])) {
        const el = document.getElementById(id)
        if (el) el.innerHTML = val
      }
    }

    const navLinks = document.querySelector('.nav-links')
    const closeMenu = () => {
      navLinks.classList.remove('open')
      navLinks.style.display = ''
    }

    const onClick = (e) => {
      const langBtn = e.target.closest('[data-lang]')
      if (langBtn) return setLang(langBtn.dataset.lang)
      if (e.target.closest('[data-menu-toggle]')) {
        navLinks.classList.toggle('open')
        navLinks.style.display = navLinks.classList.contains('open') ? 'flex' : ''
        return
      }
      if (e.target.closest('.nav-links a')) closeMenu()
    }
    document.addEventListener('click', onClick)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return null
}
