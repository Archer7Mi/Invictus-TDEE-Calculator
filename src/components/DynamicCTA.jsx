export default function DynamicCTA({ goal }) {
  let headline = '';
  let message = '';
  let btnText = '';
  if (goal === 'lose') {
    headline = 'You’ve Got the Numbers—But the Belly’s Still There?';
    message = 'Text me now and I’ll give you a free review and a step-by-step plan to lose the fat in 6 weeks. No more confusion—just results.';
    btnText = 'Text Me for My 6-Week Fat Loss Plan';
  } else if (goal === 'gain') {
    headline = 'You’re Eating More—But Still Not Growing?';
    message = 'Text me now for a free intake review and a proven 8-week muscle-building plan. I’ll show you exactly how to track and eat for real gains.';
    btnText = 'Text Me for My 8-Week Muscle Plan';
  } else {
    headline = 'You Hit Your Goal—But Can You Keep It?';
    message = 'Text me now for a free review and a 3-month maintenance strategy to stay lean and in control—no more rebound.';
    btnText = 'Text Me for My 3-Month Maintenance Plan';
  }

  const whatsappLink = 'https://wa.me/254711677140';

  return (
    <div className="cta">
      <h3>{headline}</h3>
      <p>{message}</p>
      <a className="cta-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">{btnText}</a>
    </div>
  );
}