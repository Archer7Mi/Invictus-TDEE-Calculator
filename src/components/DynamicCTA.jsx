export default function DynamicCTA({ goal }) {
  let headline = '';
  let message = '';
  let btnText = '';
  if (goal === 'lose') {
    headline = 'Ready to Lose Fat the Right Way?';
    message = "You've got your numbers! Now, let me show you how to turn them into real results. If you want a clear explanation and a plan tailored to you, just text me on WhatsApp and I'll help you get started!";
    btnText = 'Text Me for Fat Loss Help';
  } else if (goal === 'gain') {
    headline = 'Want to Build Muscle Effectively?';
    message = "Your calorie target is set for muscle gain. Want to know how to use it for real progress? Text me on WhatsApp for a personal explanation and a proven muscle-building plan!";
    btnText = 'Text Me for Muscle Gain Help';
  } else {
    headline = 'Want to Maintain and Thrive?';
    message = "Staying on track is key. If you want a clear explanation and ongoing support, text me on WhatsApp and I'll help you stay consistent!";
    btnText = 'Text Me for Support';
  }

  const whatsappLink = 'https://wa.me/254711677140';

  return (
    <div className="cta">
      <h3>{headline}</h3>
      <p>{message}</p>
      <a className="cta-btn" href={whatsappLink} target="_blank" rel="noopener noreferrer">{btnText}</a>
      <small>Replies are personal. No bots, just real help!</small>
    </div>
  );
}