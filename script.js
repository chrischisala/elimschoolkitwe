/**
 * ELIM SCHOOL KITWE - OFFICIAL WEBSITE JAVASCRIPT
 * Comprehensive interactive controls, fee calculator, gallery lightbox, 
 * printable application modal, and WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 2. Sticky Header Shadow & Scroll Spy
  const mainHeader = document.querySelector('.main-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Header shadow
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }

    // Scroll spy
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Academic Curriculum Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 4. Interactive School Fee Estimator / Calculator
  const calcGrade = document.getElementById('calcGrade');
  const calcPeriod = document.getElementById('calcPeriod');
  const calcStudentType = document.getElementById('calcStudentType');
  const calcPtaCheck = document.getElementById('calcPtaCheck');
  
  const calcTuitionDisplay = document.getElementById('calcTuitionDisplay');
  const calcPtaDisplay = document.getElementById('calcPtaDisplay');
  const calcAdminDisplay = document.getElementById('calcAdminDisplay');
  const calcTotalDisplay = document.getElementById('calcTotalDisplay');
  const calcWhatsappBtn = document.getElementById('calcWhatsappBtn');

  // Rates in Zambian Kwacha (ZMW)
  const feeRates = {
    daycare: 4200,       // Day-care (Babies)
    nursery: 4100,       // Nursery, Pre & Reception
    primary: 4500        // Grade 1 to 7
  };

  const ptaFeePerTerm = 200;
  const assessmentFee = 200;
  const admissionFee = 200;

  function calculateSchoolFees() {
    if (!calcGrade || !calcTotalDisplay) return;

    const gradeVal = calcGrade.value; // 'daycare', 'nursery', 'primary'
    const periodMultiplier = parseInt(calcPeriod.value, 10) || 1; // 1 term or 3 terms
    const isNewStudent = calcStudentType.value === 'new';
    const includePta = calcPtaCheck.checked;

    const baseTermTuition = feeRates[gradeVal] || 4500;
    const totalTuition = baseTermTuition * periodMultiplier;

    const totalPta = includePta ? (ptaFeePerTerm * periodMultiplier) : 0;
    const totalRegistration = isNewStudent ? (assessmentFee + admissionFee) : 0;
    const grandTotal = totalTuition + totalPta + totalRegistration;

    // Update UI
    calcTuitionDisplay.textContent = `K${totalTuition.toLocaleString()}`;
    calcPtaDisplay.textContent = `K${totalPta.toLocaleString()}`;
    calcAdminDisplay.textContent = totalRegistration > 0 ? `K${totalRegistration.toLocaleString()}` : 'K0 (Continuing)';
    calcTotalDisplay.textContent = `K${grandTotal.toLocaleString()}`;

    // Update WhatsApp pre-filled link
    const gradeNames = {
      daycare: 'Day-Care (Babies)',
      nursery: 'Nursery / Pre-School / Reception',
      primary: 'Primary (Grade 1 - 7)'
    };
    const periodText = periodMultiplier === 1 ? '1 Term' : 'Full Academic Year (3 Terms)';
    const statusText = isNewStudent ? 'New Student (includes K200 Assessment + K200 Admission)' : 'Continuing Student';

    const message = encodeURIComponent(
      `Hello Elim School Admissions! 📚\nI calculated a fee estimate on your website:\n` +
      `• Level: ${gradeNames[gradeVal]}\n` +
      `• Period: ${periodText}\n` +
      `• Status: ${statusText}\n` +
      `• Tuition: K${totalTuition.toLocaleString()}\n` +
      `• PTA Contribution: K${totalPta.toLocaleString()}\n` +
      `• Registration/Assessment: K${totalRegistration.toLocaleString()}\n` +
      `• Estimated Total: K${grandTotal.toLocaleString()}\n\n` +
      `I would like to inquire about space availability and enrollment requirements for Term 1, 2027. Thank you!`
    );

    if (calcWhatsappBtn) {
      calcWhatsappBtn.href = `https://wa.me/260977970408?text=${message}`;
    }
  }

  if (calcGrade && calcPeriod && calcStudentType && calcPtaCheck) {
    calcGrade.addEventListener('change', calculateSchoolFees);
    calcPeriod.addEventListener('change', calculateSchoolFees);
    calcStudentType.addEventListener('change', calculateSchoolFees);
    calcPtaCheck.addEventListener('change', calculateSchoolFees);
    // Initial run
    calculateSchoolFees();
  }

  // 5. Photo Gallery Filters & Lightbox Modal
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption');
      const category = item.querySelector('.gallery-category');

      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${category ? category.textContent + ' — ' : ''}</strong>${caption ? caption.textContent : ''}`;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightboxModal && lightboxModal.classList.contains('active')) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
      const appModal = document.getElementById('applicationModal');
      if (appModal && appModal.classList.contains('active')) {
        appModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });

  // 6. Application Modal Open / Close
  const appModal = document.getElementById('applicationModal');
  const openModalBtns = document.querySelectorAll('.open-application-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (appModal) {
        appModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeModalBtn && appModal) {
    closeModalBtn.addEventListener('click', () => {
      appModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    appModal.addEventListener('click', (e) => {
      if (e.target === appModal) {
        appModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Quick Application Form Submission Handler
  const onlineAppForm = document.getElementById('onlineAppForm');
  if (onlineAppForm) {
    onlineAppForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const studentName = document.getElementById('modalStudentName').value;
      const grade = document.getElementById('modalGrade').value;
      const parentName = document.getElementById('modalParentName').value;
      const phone = document.getElementById('modalPhone').value;

      // Construct message for WhatsApp
      const waMsg = encodeURIComponent(
        `Hello Elim School! 🏫\nI have completed an online admission form on your website:\n` +
        `• Student Name: ${studentName}\n` +
        `• Grade Requested: ${grade}\n` +
        `• Parent / Guardian: ${parentName}\n` +
        `• Contact Phone: ${phone}\n\n` +
        `Please confirm when we can bring the student for the K200 assessment interview at 21 Pamo Avenue, Parklands.`
      );

      // Offer immediate WhatsApp dispatch
      const confirmDispatch = confirm(
        `Thank you, ${parentName}! Your preliminary application for ${studentName} (${grade}) has been prepared.\n\n` +
        `Would you like to send this directly to the Elim School Admissions WhatsApp (+260 977 970 408) right now to confirm assessment scheduling?`
      );

      if (confirmDispatch) {
        window.open(`https://wa.me/260977970408?text=${waMsg}`, '_blank');
      }

      onlineAppForm.reset();
      if (appModal) {
        appModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. Contact Form Handler
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value;
      const phone = document.getElementById('contactPhone').value;
      const email = document.getElementById('contactEmail').value;
      const grade = document.getElementById('contactGrade').value;
      const message = document.getElementById('contactMessage').value;

      const waText = encodeURIComponent(
        `New Website Inquiry for Elim School Kitwe:\n` +
        `• Name: ${name}\n` +
        `• Phone: ${phone}\n` +
        `• Email: ${email || 'N/A'}\n` +
        `• Grade of Interest: ${grade}\n` +
        `• Message: ${message}`
      );

      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Ask if they want direct WhatsApp response
      const openWhatsApp = confirm(
        `Thank you for contacting Elim School, ${name}!\n\n` +
        `Your inquiry has been recorded. Would you also like to open this directly in WhatsApp with our admissions team (+260 977 970 408) for immediate assistance?`
      );

      if (openWhatsApp) {
        window.open(`https://wa.me/260977970408?text=${waText}`, '_blank');
      }

      contactForm.reset();
      setTimeout(() => {
        if (formSuccessAlert) formSuccessAlert.style.display = 'none';
      }, 7000);
    });
  }

  // 9. Floating WhatsApp Widget Interactive Control
  const whatsappFloatBtn = document.getElementById('whatsappFloatBtn');
  const whatsappPopup = document.getElementById('whatsappPopup');
  const closeWaPopup = document.getElementById('closeWaPopup');
  const waOptionBtns = document.querySelectorAll('.wa-option-btn');

  if (whatsappFloatBtn && whatsappPopup) {
    whatsappFloatBtn.addEventListener('click', () => {
      whatsappPopup.classList.toggle('active');
    });

    if (closeWaPopup) {
      closeWaPopup.addEventListener('click', () => {
        whatsappPopup.classList.remove('active');
      });
    }

    waOptionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const queryType = btn.getAttribute('data-query');
        let text = '';

        switch (queryType) {
          case 'enrollment':
            text = "Hello Elim School! I would like to inquire about Term 1, 2027 enrollment requirements and space availability.";
            break;
          case 'fees':
            text = "Hello! Please send me the official Elim School fee structure and payment instructions.";
            break;
          case 'visit':
            text = "Hello Elim School Administration! I would like to arrange a campus visit at Plot 21 Pamo Avenue, Parklands.";
            break;
          case 'daycare':
            text = "Hello! I am inquiring about Day-Care / Baby Class admissions, daily hours, and facilities at Elim School.";
            break;
          default:
            text = "Hello Elim School! I have an inquiry regarding admissions.";
        }

        const url = `https://wa.me/260977970408?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        whatsappPopup.classList.remove('active');
      });
    });
  }

  // 10. FAQ Accordion Toggle
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isActive = item.classList.contains('active');

      // Close all items
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // If clicked item wasn't open, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Open the first FAQ item by default
  const firstFaq = document.querySelector('.faq-item');
  if (firstFaq) {
    firstFaq.classList.add('active');
  }
});
