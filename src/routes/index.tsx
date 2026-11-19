import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BedDouble, CalendarDays, Check, Clock3, Coffee, MapPin, Menu, Phone, PlugZap, Star, Users, Wifi, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import exterior from "@/assets/image.png";
import sign from "@/assets/image copy.png";

const balcony = "/images/image.png";
const privateRoom = "/images/image copy.png";
const dining = "/images/image copy 2.png";
const guestRoom = "/images/image copy 4.png";
const terrace = balcony;
const bathroom = guestRoom;
const dormBunks = privateRoom;

const phone = "+919520208308";
const whatsApp = `https://wa.me/${phone.slice(1)}`;
const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3450.8218869486022!2d78.31579651117718!3d30.127909774776878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3909170e105a6871%3A0x4b5732af19aa7971!2sShaanti%20Coliving!5e0!3m2!1sen!2sin!4v1794997785834!5m2!1sen!2sin";

const slides = [
  { image: terrace, eyebrow: "A little more room to breathe", title: <>Find your people.<br />Find your peace.</>, copy: "Stay, connect and experience the laid-back spirit of Tapovan, Rishikesh." },
  { image: dining, eyebrow: "Good days begin together", title: <>More than a stay.<br />A community.</>, copy: "Meet fellow travellers, share stories and make a welcoming space your own." },
  { image: privateRoom, eyebrow: "Your own kind of comfortable", title: <>Settle in.<br />Slow down.</>, copy: "Choose a cosy dorm bed or a private room after a day exploring Rishikesh." },
  { image: balcony, eyebrow: "Somewhere between river and mountain", title: <>Explore more.<br />Live Shaanti.</>, copy: "Discover yoga, cafes, riverside adventures and the easy rhythm of Tapovan." },
];

const navigation = [
  ["Stay", "stay"], ["About", "about"], ["Amenities", "amenities"], ["Food", "food"],
  ["Experiences", "experiences"], ["Gallery", "gallery"], ["Contact", "contact"],
];

const gallery = [
  { image: exterior, alt: "Shaanti Coliving exterior in Tapovan", label: "The house", className: "gallery-tall" },
  { image: dormBunks, alt: "Bunk beds in the shared dormitory", label: "Shared dorm" },
  { image: terrace, alt: "Seating on the terrace with hills beyond", label: "Take a pause", className: "gallery-wide" },
  { image: guestRoom, alt: "A comfortable private room", label: "Private rooms" },
  { image: dining, alt: "The on-site dining area", label: "Around the table" },
  { image: sign, alt: "Shaanti Coliving sign in the evening", label: "Find Shaanti" },
  { image: balcony, alt: "A sunny balcony lined with plants", label: "A breath of fresh air" },
  { image: bathroom, alt: "Bathroom in the guest accommodation", label: "The details" },
];

export const Route = createFileRoute("/")({
  component: ShaantiHome,
  head: () => ({
    meta: [
      { title: "Shaanti Coliving | Hostel & Stay in Tapovan, Rishikesh" },
      { name: "description", content: "Find your place in Tapovan. Shaanti Coliving offers shared dorms, private rooms, on-site dining and a welcoming traveller community in Rishikesh." },
      { property: "og:title", content: "Shaanti Coliving | Hostel & Stay in Tapovan, Rishikesh" },
      { property: "og:description", content: "A place to stay. A place to connect. Find your Shaanti in Tapovan, Rishikesh." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "keywords", content: "Shaanti Coliving Rishikesh, hostel in Tapovan Rishikesh, coliving in Rishikesh, dormitory in Tapovan, private rooms in Rishikesh" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({
      "@context": "https://schema.org", "@type": "LodgingBusiness", name: "Shaanti Coliving", telephone: "+91 95202 08308",
      address: { "@type": "PostalAddress", streetAddress: "Bypass Road, Near Swiss Cottage, Tapovan", addressLocality: "Rishikesh", addressRegion: "Uttarakhand", postalCode: "249192", addressCountry: "IN" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.7", reviewCount: "127" },
    }) }],
  }),
});

function ShaantiHome() {
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((current) => current === null ? null : (current + 1) % gallery.length);
      if (event.key === "ArrowLeft") setLightbox((current) => current === null ? null : (current - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const currentSlide = slides[slide];
  const moveSlide = (direction: number) => setSlide((current) => (current + direction + slides.length) % slides.length);

  function submitEnquiry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hello Shaanti Coliving, I'd like to enquire about a stay.",
      `Name: ${form.get("name")}`,
      `Phone: ${form.get("phone")}`,
      `Email: ${form.get("email") || "Not provided"}`,
      `Check-in: ${form.get("checkin")}`,
      `Check-out: ${form.get("checkout")}`,
      `Accommodation: ${form.get("accommodation")}`,
      `Guests: ${form.get("guests")}`,
      `Rooms: ${form.get("rooms")}`,
      `Message: ${form.get("message") || "None"}`,
    ].join("\n");
    setSubmitted(true);
    window.open(`${whatsApp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="wordmark" href="#home" aria-label="Shaanti Coliving home"><span className="wordmark-mark">शा</span><span className="wordmark-name">shaanti<small>COLIVING · RISHIKESH</small></span></a>
        <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Main navigation">
          {navigation.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <Button asChild className="nav-cta"><a href="#enquire">Book your stay <ArrowUpRight aria-hidden="true" /></a></Button>
        </nav>
        <Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </header>

      <section id="home" className="hero" aria-label="Welcome to Shaanti Coliving">
        {slides.map((item, index) => <div key={item.image} className={`hero-slide ${index === slide ? "active" : ""}`} style={{ backgroundImage: `url(${item.image})` }} aria-hidden={index !== slide} />)}
        <div className="hero-shade" />
        <div className="hero-content" key={slide}>
          <p className="eyebrow hero-eyebrow"><span />{currentSlide.eyebrow}</p>
          <h1>{currentSlide.title}</h1>
          <p className="hero-copy">{currentSlide.copy}</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="button-coral"><a href="#about">Discover Shaanti <ArrowDown aria-hidden="true" /></a></Button>
            <a className="hero-text-link" href="#stay">Find your stay <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
        <div className="hero-bottom"><div className="hero-location"><MapPin aria-hidden="true" /> Tapovan, Rishikesh <span>·</span> Uttarakhand, India</div><div className="hero-controls"><span className="hero-count">0{slide + 1} <span>/ 0{slides.length}</span></span><Button variant="ghost" size="icon" aria-label="Previous slide" onClick={() => moveSlide(-1)}><ArrowLeft /></Button><Button variant="ghost" size="icon" aria-label="Next slide" onClick={() => moveSlide(1)}><ArrowRight /></Button></div></div>
        <div className="hero-dots" aria-label="Choose a hero slide">{slides.map((item, index) => <button key={item.image} aria-label={`Show slide ${index + 1}`} aria-current={index === slide} onClick={() => setSlide(index)} />)}</div>
      </section>

      <div className="quick-facts"><span><Star aria-hidden="true" /><strong>4.7</strong> <span className="fact-muted">· 127 reviews</span></span><span><MapPin aria-hidden="true" /> Tapovan, Rishikesh</span><span><Clock3 aria-hidden="true" /> Check-in 12 PM <i>·</i> Check-out 11 AM</span></div>

      <section id="about" className="section about-section">
        <div className="about-photo"><img src={terrace} alt="A calm open-air terrace at Shaanti, with seating and mountain views" /><div className="photo-caption"><span>01 / A slower kind of stay</span><span>Tapovan, Rishikesh</span></div></div>
        <div className="about-copy"><p className="eyebrow"><span className="eyebrow-dash" />A place to land</p><h2>A place to stay.<br /><em>A place to connect.</em></h2><p className="body-copy">Shaanti Coliving is a hostel and coliving stay on Bypass Road, near Swiss Cottage in Tapovan. Come for a few nights or stay a little longer—find a comfortable base, unhurried surroundings and good company along the way.</p><div className="about-notes"><span><Check /> Welcoming traveller atmosphere</span><span><Check /> Shared dorms and private rooms</span><span><Check /> Made for short and longer stays</span></div><a className="text-link" href="#experiences">Get to know the place <ArrowUpRight /></a><div className="about-stamp"><span>नमस्ते</span><small>FIND YOUR<br />SHAANTI</small></div></div>
      </section>

      <section id="stay" className="section stay-section"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dash" />Make yourself at home</p><h2>Find your<br className="mobile-break" /> kind of stay.</h2></div><p>Some come for the people, some for the quiet. Choose the room that feels like you.</p></div>
        <div className="stay-grid">
          <article className="stay-card"><div className="stay-image"><img src={dormBunks} alt="Bunk beds in the shared Shaanti dormitory" /><span className="photo-tag">For the fellow travellers</span></div><div className="stay-card-info"><div><span className="card-kicker">SHARED DORMITORY</span><h3>Bring your<br />curiosity.</h3></div><div className="stay-card-detail"><p>A welcoming, budget-friendly bed for solo travellers and backpackers ready to meet along the way.</p><div className="price"><span>Starting around</span><strong>₹467 <small>/ night</small></strong></div><Button asChild variant="outline" className="round-link"><a href={`${whatsApp}?text=${encodeURIComponent("Hello Shaanti, I'd like to enquire about a shared dorm bed.")}`} target="_blank" rel="noreferrer" aria-label="Enquire about a dorm bed"><ArrowUpRight /></a></Button></div></div></article>
          <article className="stay-card"><div className="stay-image"><img src={privateRoom} alt="Private room with a comfortable double bed and air conditioning" /><span className="photo-tag">A little space of your own</span></div><div className="stay-card-info"><div><span className="card-kicker">PRIVATE DELUXE ROOM</span><h3>Rest in<br />your rhythm.</h3></div><div className="stay-card-detail"><p>A comfortable, air-conditioned private room for couples and travellers who like their own space.</p><div className="price"><span>Indicative price</span><strong>₹2,802–3,025 <small>/ night</small></strong></div><Button asChild variant="outline" className="round-link"><a href={`${whatsApp}?text=${encodeURIComponent("Hello Shaanti, I'd like to enquire about a private deluxe room.")}`} target="_blank" rel="noreferrer" aria-label="Enquire about a private room"><ArrowUpRight /></a></Button></div></div></article>
        </div><p className="price-note">Indicative prices vary with dates, season and availability. Please confirm directly before planning your stay.</p>
      </section>

      <section id="amenities" className="amenity-band"><div className="section amenity-inner"><div className="amenity-heading"><p className="eyebrow"><span className="eyebrow-dash" />The good-to-knows</p><h2>Simple comforts.<br /><em>Thoughtfully covered.</em></h2><p>Everything you need to settle in and make the most of your time here.</p></div><div className="amenity-list"><Amenity icon={<Wifi />} label="Free Wi-Fi" /><Amenity icon={<MapPin />} label="On-site parking" /><Amenity icon={<Coffee />} label="Restaurant & paid breakfast" /><Amenity icon={<BedDouble />} label="Air-conditioned private rooms" /><Amenity icon={<PlugZap />} label="24/7 power & water supply" /><Amenity icon={<Clock3 />} label="Room & laundry service" /></div></div></section>

      <section id="experiences" className="section community-section"><div className="community-visual"><img src={balcony} alt="Sunlit balcony at Shaanti with plants and views of the hills" /><div className="community-note"><Users aria-hidden="true" /><span>Come solo.<br />Leave with stories.</span></div></div><div className="community-copy"><p className="eyebrow"><span className="eyebrow-dash" />The people make the place</p><h2>Come solo.<br /><em>Leave with stories.</em></h2><p className="body-copy">A shared meal, a new walking companion, a story you weren't expecting. Shaanti is a comfortable base to meet fellow travellers and explore Rishikesh at your own pace.</p><div className="community-points"><div><span>01</span><p><strong>Meet fellow travellers</strong><small>Swap stories and find your people.</small></p></div><div><span>02</span><p><strong>Stay a little longer</strong><small>Settle in and make Tapovan your base.</small></p></div><div><span>03</span><p><strong>Slow down</strong><small>Make space for the journey, not just the plans.</small></p></div></div><Button asChild variant="outline" className="outline-link"><a href="#enquire">Come find your Shaanti <ArrowUpRight /></a></Button></div></section>

      <section id="food" className="food-section"><div className="food-image"><img src={dining} alt="The inviting on-site dining space at Shaanti Coliving" /><div className="food-image-label">A seat at the table <span>02 / DINING AT SHAANTI</span></div></div><div className="food-copy"><p className="eyebrow"><span className="eyebrow-dash" />Gather around</p><h2>Good food.<br /><em>Good people.</em><br />Easy evenings.</h2><p>Enjoy the convenience of dining at the property. Breakfast is available at an additional charge, with meals available on-site during your stay.</p><a className="text-link" href={whatsApp} target="_blank" rel="noreferrer">Ask us about dining <ArrowUpRight /></a></div></section>

      <section className="explore-section"><div className="section"><div className="section-heading explore-heading"><div><p className="eyebrow"><span className="eyebrow-dash" />Outside your door</p><h2>Your Rishikesh<br />chapter starts here.</h2></div><p>Take Tapovan at your own pace—one landmark, leafy lane or long riverside pause at a time.</p></div><div className="explore-grid"><ExploreCard number="01" title="Lakshman Jhula" copy="An iconic bridge and the riverside neighbourhood around it." image={terrace} /><ExploreCard number="02" title="Ram Jhula" copy="A much-loved Rishikesh landmark on the Ganga." image={balcony} /><ExploreCard number="03" title="Tapovan & beyond" copy="Cafe corners, local streets, yoga and wellness." image={exterior} /></div><p className="explore-note"><MapPin /> A good starting point for local discoveries. Ask the team for ideas during your stay.</p></div></section>

      <section className="why-section"><div className="section why-inner"><div className="why-title"><p className="eyebrow"><span className="eyebrow-dash" />The Shaanti feeling</p><h2>Room for your<br /><em>kind of journey.</em></h2></div><div className="why-grid"><div><span>01</span><h3>A gentler pace</h3><p>Unhurried Tapovan surroundings to come back to.</p></div><div><span>02</span><h3>Choose your space</h3><p>Shared dorms or a private room to call yours.</p></div><div><span>03</span><h3>People to meet</h3><p>A welcoming base for travellers from everywhere.</p></div><div><span>04</span><h3>A handy location</h3><p>On Bypass Road near Swiss Cottage, Tapovan.</p></div><div><span>05</span><h3>Everyday essentials</h3><p>Wi-Fi, parking, laundry and on-site dining.</p></div><div><span>06</span><h3>A warm welcome</h3><p>Friendly hosts to help make your stay easier.</p></div></div></div></section>

      <section id="gallery" className="section gallery-section"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-dash" />A glimpse of Shaanti</p><h2>Little moments.<br /><em>Real places.</em></h2></div><p>A few corners of the home base waiting for you in Tapovan.</p></div><div className="gallery-grid">{gallery.map((item, index) => <button className={`gallery-item ${item.className ?? ""}`} key={item.label} onClick={() => setLightbox(index)} aria-label={`View photo: ${item.label}`}><img src={item.image} alt={item.alt} /><span>{item.label}<ArrowUpRight /></span></button>)}</div></section>

      <section className="reviews-band"><div className="section reviews-inner"><div className="rating-block"><p className="eyebrow"><span className="eyebrow-dash" />A little love from guests</p><div className="rating-line"><span className="rating-number">4.7</span><span className="rating-stars" aria-label="Rated 4.7 out of 5"><Star /><Star /><Star /><Star /><Star /></span></div><p className="review-count">out of 5 <span>·</span> 127 reviews</p><p className="rating-copy">A peaceful atmosphere, clean rooms and a warm welcome are what make the difference.</p></div><div className="review-themes"><span>What guests appreciate</span><div><span>Peaceful atmosphere</span><span>Clean rooms</span><span>Welcoming hosts</span><span>Reliable power & water</span></div><small>Rating and review count supplied by the property.</small></div></div></section>

      <section id="enquire" className="enquire-section"><div className="enquire-photo"><img src={sign} alt="Shaanti Coliving sign nestled among plants" /><span>YOUR NEXT RISHIKESH STAY STARTS HERE</span></div><div className="enquire-content"><p className="eyebrow"><span className="eyebrow-dash" />Tell us what you have in mind</p><h2>Find your space<br /><em>at Shaanti.</em></h2><p className="body-copy">Tell us a little about your trip. We’ll help you enquire directly about your stay.</p><form className="enquiry-form" onSubmit={submitEnquiry}>
          <label>Full name<input name="name" autoComplete="name" placeholder="Your name" required /></label><label>Phone number<input name="phone" type="tel" autoComplete="tel" placeholder="Your number" required /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="Optional" /></label><label>Accommodation<select name="accommodation" defaultValue="Shared dormitory"><option>Shared dormitory</option><option>Private deluxe room</option><option>Not sure yet</option></select></label>
          <label>Check-in<input name="checkin" type="date" required /></label><label>Check-out<input name="checkout" type="date" required /></label>
          <label>Guests<input name="guests" type="number" min="1" defaultValue="1" required /></label><label>Rooms<input name="rooms" type="number" min="1" defaultValue="1" required /></label>
          <label className="form-wide">A note for us<textarea name="message" rows={3} placeholder="Anything you'd like us to know?" /></label>
          <div className="form-submit form-wide"><Button type="submit" size="lg" className="button-forest">{submitted ? "Send another enquiry" : "Send booking enquiry"}<ArrowUpRight /></Button><span>Opens WhatsApp to send your enquiry directly. No booking or availability is confirmed online.</span></div>
        </form><a className="direct-call" href={`tel:${phone}`}><Phone /> Prefer to call? <strong>+91 95202 08308</strong></a></div></section>

      <section id="contact" className="contact-section"><div className="contact-copy"><p className="eyebrow"><span className="eyebrow-dash" />Come say hello</p><h2>Find your way<br /><em>to Shaanti.</em></h2><p className="address"><MapPin />Bypass Road, Near Swiss Cottage,<br />Tapovan, Rishikesh, Uttarakhand 249192, India</p><div className="contact-links"><a href={`tel:${phone}`}><Phone /> Call us <ArrowUpRight /></a><a href={whatsApp} target="_blank" rel="noreferrer"><span className="wa-symbol">W</span> WhatsApp <ArrowUpRight /></a><a href="https://maps.google.com/?q=Shaanti+Coliving+Tapovan+Rishikesh" target="_blank" rel="noreferrer"><MapPin /> Get directions <ArrowUpRight /></a></div><div className="check-times"><span><CalendarDays /> Check-in <strong>12:00 PM</strong></span><span><Clock3 /> Check-out <strong>11:00 AM</strong></span></div></div><div className="map-frame"><iframe src={mapUrl} title="Map showing Shaanti Coliving in Tapovan, Rishikesh" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div></section>

      <footer className="footer"><div className="footer-main"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">शा</span><span className="wordmark-name">shaanti<small>COLIVING · RISHIKESH</small></span></a><p>Stay together.<br />Explore Rishikesh.<br /><em>Find your Shaanti.</em></p><a className="footer-book" href="#enquire">Make an enquiry <ArrowUpRight /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Shaanti Coliving</span><div>{navigation.map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}</div><a href={`tel:${phone}`}>+91 95202 08308</a></div></footer>

      {lightbox !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={gallery[lightbox]?.label ?? "Photo gallery"} onClick={() => setLightbox(null)}><Button variant="ghost" size="icon" className="lightbox-close" aria-label="Close photo" onClick={() => setLightbox(null)}><X /></Button><Button variant="ghost" size="icon" className="lightbox-prev" aria-label="Previous photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox - 1 + gallery.length) % gallery.length); }}><ArrowLeft /></Button><figure onClick={(event) => event.stopPropagation()}><img src={gallery[lightbox]?.image} alt={gallery[lightbox]?.alt} /><figcaption>{gallery[lightbox]?.label} <span>· {String(lightbox + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}</span></figcaption></figure><Button variant="ghost" size="icon" className="lightbox-next" aria-label="Next photo" onClick={(event) => { event.stopPropagation(); setLightbox((lightbox + 1) % gallery.length); }}><ArrowRight /></Button></div>}
      <a className="back-top" href="#home" aria-label="Back to top"><ArrowUpRight /></a>
    </main>
  );
}

function Amenity({ icon, label }: { icon: React.ReactNode; label: string }) {
  return <div className="amenity-item"><span>{icon}</span><p>{label}</p></div>;
}

function ExploreCard({ number, title, copy, image }: { number: string; title: string; copy: string; image: string }) {
  return <article className="explore-card"><div className="explore-image"><img src={image} alt="Rishikesh scenery from the Shaanti Coliving area" /><span>{number}</span></div><div className="explore-info"><h3>{title}</h3><p>{copy}</p><MapPin aria-hidden="true" /></div></article>;
}