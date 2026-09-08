# Site index · format 1
Structure and the names of what each page offers. Values that change often — prices, hours, phone,
address — and body copy are deliberately not recorded here; read the page itself for those.

## index.html → /
title: Custom Facials & Face Massage in Fairfield, CT | Veda Healing Spa
purpose: The landing page — the spa's story, its founder, reviews, gallery, blog teasers, gift cards, featured products and FAQ.
sections:
- `#main-content` "Custom Facials & Face Massage in Fairfield, CT" — the page body, holding the hero and every section below it
- `#hero-heading` — the page's h1
- `#about` "About Veda Healing Spa" — the founder Harpreet Kaur's background and approach, naming: Licensed Esthetician, Ayurvedic Techniques, chemical peels, microdermabrasion, dermaplaning, Shahnaz Husain College of Beauty
- `#about-heading` — the About section's h2
- "Video" and "The Power of OM" — the video block
- `#reviews-heading` "Veda Healing Spa's Rave Reviews" — the reviews block's heading
- `#gallery` "Gallery" — photographs of the spa and its treatments, with its heading in `#gallery-heading`
- "Follow Veda Healing Spa" — the social follow block
- `#blog` "My Blog" — teasers for the two blog posts, with its heading in `#blog-heading`
- `#gift-cards` "Give the Gift of Relaxation" — the gift-card block and its Spa Treats for Your Loved Ones copy
- `#featured-products` "Featured Products" — 2 products carried over from the shop: iS Clinical Triple Cleanse, iS Clinical Sheald Recovery Balm
- `#faq` "Frequently Asked Questions" — the FAQ accordion, with its heading in `#faq-heading`
- `#contact-info` "Veda Healing Spa" — the address, phone and hours block, with its heading in `#contact-info-heading`
- `#subscribe-heading` and `#home-newsletter-email` — the newsletter sign-up
also: The `#contact-info` block is repeated verbatim on this page and on both services pages, always with the same id but a different heading id each time. Changing the address or phone means editing three pages.
also: Almost every heading on this page has its own id separate from the section that contains it, so a heading change and a section change are two different edits in two different places.

## about-founder.html → /about-founder
title: About Founder | Veda Healing Spa
purpose: The founder's page — Harpreet Kaur's background, training and credentials.
sections:
- `#main-content` "About Founder" — the page body, naming: Licensed Esthetician, Energy Healer, Ayurvedic
- `#about-founder-heading` — the page's h1
also: The founder's story is written here and again inside `#about` on index.html, at similar length. The two are separate copies and nothing keeps them in step.

## services-skin-care.html → /services-skin-care
title: Skin Care Facials, Cleansing Treatments & Daily Care Routines in Fairfield, CT | Veda Healing Spa
purpose: The skin-care services page — the facials offered, the daily routine recommended, reviews, gallery and FAQ.
sections:
- `#main-content` "Skin Care Facials, Daily Cleansing Routines & Personalized Daily Care in Fairfield, CT" — the page body
- `#sc-intro-heading` "Healthy Skin Is a Lifestyle" — the introduction
- `#sc-services-heading` "Skin Care Facial Treatments" — the services offered: Customized Facial, Deep Cleansing Facial, Kansa Wand Facial, Chemical Peels, Microdermabrasion & Dermaplaning, Energy Healing & Skin Care
- `#sc-process-heading` "A Daily Cleansing Protocol That Works" — the recommended routine: Gentle Double Cleanse, Targeted Toning, Active Serum Application, Moisturiser & Barrier Support, Daily SPF, Weekly Exfoliation
- `#sc-feature-heading` "Why Harpreet's Approach Gets Results" — the differentiators block
- `#sc-reviews-heading` "What Clients Say About Their Skin Care Results" — client reviews
- `#sc-gallery-heading` "Skin Care in Action" — the gallery
- `#sc-related-heading` "Explore Our Skin Treatments" — the link across to the treatments page
- `#sc-cta-heading` "Ready for Skin That Transforms?" — the closing call to action
- `#sc-faq-heading` "Skin Care FAQ" — the FAQ accordion
- `#contact-info` "Veda Healing Spa" — the address, phone and hours block, with its heading in `#sc-contact-heading`
- `#sc-subscribe-heading` and `#sc-newsletter-email` — the newsletter sign-up
also: Chemical Peels, Microdermabrasion, Dermaplaning and the Kansa Wand facial are offered on this page AND on services-skin-treatment.html, described differently on each. A client reading both sees two accounts of the same treatment, and renaming one leaves the other.
also: The ids on this page are prefixed `sc-` and the equivalent ids on the treatments page are prefixed `st-`. The two pages are otherwise structurally identical, so an id-based change meant for one will not match the other even though the section is the same.

## services-skin-treatment.html → /services-skin-treatment
title: Skin Treatments in Fairfield, CT — Exfoliation, Hydration & Restorative Therapies | Veda Healing Spa
purpose: The skin-treatments page — the deeper treatments offered, how a session is structured, reviews and FAQ.
sections:
- `#main-content` "Professional Skin Treatments in Fairfield, CT" — the page body
- `#st-intro-heading` "Skin Treatments That Go Deeper" — the introduction
- `#st-treatments-heading` "Exfoliation, Hydration & Restorative Skin Treatments" — the treatments offered: Microdermabrasion, Dermaplaning, Chemical Peels, Deep Hydration Treatment, Restorative Skin Therapy, Kansa Wand Restorative Facial
- `#st-process-heading` "How Each Skin Treatment Is Structured" — the stages of a session: Skin Assessment, Cleansing & Preparation, Targeted Exfoliation, Active Treatment & Hydration, Restorative Massage & Energy Work, Home Care Guidance
- `#st-feature-heading` "Skin Treatments Backed by Real Experience" — the differentiators block
- `#st-reviews-heading` "What Clients Say About Their Skin Treatment Results" — client reviews
- `#st-cta-heading` "Ready to Transform Your Skin?" — the closing call to action
- `#st-faq-heading` "Skin Treatment FAQ" — the FAQ accordion
- `#contact-info` "Veda Healing Spa" — the address, phone and hours block, with its heading in `#st-contact-heading`
- `#st-subscribe-heading` and `#st-newsletter-email` — the newsletter sign-up
also: This page has no gallery and no related-services block, while the skin-care page has both. The two pages otherwise mirror each other section for section.

## shop.html → /shop
title: Shop | Veda Healing Spa Skincare Products
purpose: The product shop — the retail skincare range, each product with an enquiry action rather than a checkout.
sections:
- `#main-content` "Shop" — the page body
- `#triple-cleanse` "iS Clinical Triple Cleanse" — one product with its description
- `#is-cleaning-complex` "iS Cleaning Complex" — one product with its description
- `#azelaic-radiance-serum` "Azelaic Radiance Serum" — one product with its description
- `#veda-healing-grape-skin-toner-organic-ingredients` "Veda Healing Grape Skin Toner (Organic Ingredients)" — one product with its description
- `#hyaluronic-eye-restore` "Hyaluronic Eye Restore" — one product with its description
- `#is-clinical-sheald-recovery-balm` "iS Clinical Sheald Recovery Balm" — one product with its description
- `#pure-clarity-trial-kit` "Pure Clarity Trial Kit" — one product with its description
- `#inquire-dialog` "Product Inquiry" — the enquiry pop-up, with its label in `#inquire-dialog-label`
- `#inquire-form` — the enquiry form, with `#inquire-name`, `#inquire-email`, `#inquire-phone` and `#inquire-message`
also: Each product's id is its name turned into a slug, so renaming a product leaves its id spelling the old name — and one of them, `veda-healing-grape-skin-toner-organic-ingredients`, carries the parenthetical too.
also: Nothing on this page can be bought. Every product leads to the same enquiry pop-up, and the pop-up does not record which product it was opened from anywhere in the markup.

## blog-ayurvedic-facial.html → /blog-ayurvedic-facial
title: Unlocking the Secrets of Ayurvedic Facial Treatments: Marma Point
purpose: A blog post about Ayurvedic facial treatments and marma point massage.
sections:
- `#main-content` "Unlocking the Secrets of Ayurvedic Facial Treatments: Marma Point" — the post

## blog-oily-skin.html → /blog-oily-skin
title: Say Goodbye to Oily Skin: Professional Skincare Treatments
purpose: A blog post about professional treatments for oily skin.
sections:
- `#main-content` "Say Goodbye to Oily Skin: Professional Skincare Treatments" — the post
also: Both blog posts are one undivided block with no ids inside, so a change to part of a post is located only by its wording. Their titles are also written out on index.html inside `#blog`, so retitling a post means editing two pages.

## contact-us.html → /contact-us
title: Contact Us | Veda Healing Spa Fairfield CT
purpose: The contact page — a message form and the newsletter sign-up.
sections:
- `#main-content` "Contact Us" — the page body, with its h1 in `#contact-heading`
- `#contact-form` — the message form, with `#contact-name`, `#contact-email` and `#contact-message`
- `#subscribe-heading` and `#contact-newsletter-email` — the newsletter sign-up
also: This page does not state the address, phone number or opening hours. Those live only in the `#contact-info` block on index.html and the two services pages, so the page a visitor goes to for contact details is the one page that has none.

## privacy-policy.html → /privacy-policy
title: Privacy Policy | Veda Healing Spa
purpose: The privacy policy page.
sections:
- `#main-content` "Privacy Policy" — the page body
also: The page contains a heading and one short line. There is no policy text on it.

## shared (every page)
The header, navigation, mobile menu and footer are propagated from index.html to every other page by
`shell_propagation`. A change to any of them is made on index.html alone and copied automatically.
