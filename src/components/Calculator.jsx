import { useState } from 'react'

const activityOptions = [
  { value: 'sedentary', label: 'Sedentary - Desk job, minimal movement (little/no exercise)', factor: 1.2 },
  { value: 'light', label: 'Lightly Active - Light exercise 1-3x/week (walking, occasional gym)', factor: 1.375 },
  { value: 'moderate', label: 'Moderately Active - Moderate exercise 3-5x/week (regular gym or team sports)', factor: 1.55 },
  { value: 'very', label: 'Very Active - Hard exercise 6-7x/week or physical job (intense training)', factor: 1.725 }
]

export default function Calculator() {
  const [page, setPage] = useState('form') // 'form' or 'results'
  const [formData, setFormData] = useState({
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    activity: 'sedentary',
    goal: 'lose'
  })
  const [results, setResults] = useState(null)

  const calculateTDEE = () => {
    const { age, gender, weight, height, activity, goal } = formData

    if (!age || !weight || !height) {
      alert('Please fill in all required fields')
      return
    }

    const w = Number(weight)
    const h = Number(height)
    const a = Number(age)
    const act = activityOptions.find((o) => o.value === activity)?.factor || 1.2

    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161

    const tdee = Math.round(bmr * act)

    // Fat loss range: 15% - 25% deficit
    const lossHigh = Math.round(tdee * 0.85)
    const lossLow = Math.round(tdee * 0.75)

    // Protein guidance: 1.6 - 2.2 g/kg
    const protLow = Math.round(w * 1.6)
    const protHigh = Math.round(w * 2.2)

    // Midpoint for context
    const lossMid = Math.round((lossLow + lossHigh) / 2)

    // Protein % of calories at midpoint
    const protCalories = ((protLow + protHigh) / 2) * 4
    const protPct = Math.round((protCalories / lossMid) * 100)

    // Insights
    const insights = []
    if (activity === 'sedentary') insights.push('Biggest win: movement and daily routine — start small and be consistent.')
    if (tdee >= 2800) insights.push('Biggest win: tightening nutrition structure and tracking intake consistently.')
    if (lossLow < 1200) insights.push('Safety note: target calories are very low — prioritise sustainability and preserve muscle.')

    setResults({
      bmr: Math.round(bmr),
      tdee,
      lossLow,
      lossHigh,
      protLow,
      protHigh,
      protPct,
      insights,
      goal
    })

    setPage('results')
  }

  if (page === 'results' && results) {
    return (
      <div className="results-page">
        <div className="results-header">
          <h2>Your Results</h2>
          <button onClick={() => setPage('form')} className="back-btn">← Recalculate</button>
        </div>

        <div className="result-card primary">
          <p className="result-label">Your Base Metabolic Rate (BMR)</p>
          <p className="result-value">{results.bmr} <span className="unit">cal/day</span></p>
          <p className="result-desc">This is what your body burns at complete rest</p>
        </div>

        <div className="result-card primary">
          <p className="result-label">Your Total Daily Energy Expenditure (TDEE)</p>
          <p className="result-value highlight">{results.tdee} <span className="unit">cal/day</span></p>
          <p className="result-desc">This includes your daily activities and exercise</p>
        </div>

        {results.goal === 'lose' && (
          <div className="result-card featured">
            <p className="result-label">💡 Recommended Daily Intake for Fat Loss</p>
            <p className="result-value">{results.lossLow} — {results.lossHigh} <span className="unit">calories</span></p>
            <div className="explanation-box">
              <p className="explanation-title">Why This Matters:</p>
              <p className="explanation-text">For healthy fat loss, we're creating a moderate 15-25% calorie deficit. This helps you lose 0.5-1kg per week while preserving muscle and energy.</p>
            </div>
          </div>
        )}

        <div className="result-card">
          <h3 className="section-title">Protein Guidance</h3>
          <p>Aim for <strong>{results.protLow}–{results.protHigh} g</strong> protein per day (~{results.protPct}% of calories at target).</p>
        </div>

        {results.insights.length > 0 && (
          <div className="result-card insights">
            <h3 className="section-title">🎯 Your First Action Step</h3>
            <ul>
              {results.insights.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        )}

        <div className="info-block">
          <h3>How This Was Calculated</h3>
          <p>We use the Mifflin-St Jeor TDEE formula, currently considered one of the most reliable research-based equations for estimating daily calorie expenditure. It uses your age, height, weight, gender and activity level to estimate how many calories your body burns in a day. This gives a realistic starting point — not a gimmick number.</p>

          <h4>Important Reality Check</h4>
          <p>This number is an estimate — not an absolute truth. Your body doesn't follow maths perfectly. Fat loss depends on consistency, sleep, stress, hormones, training quality and accuracy of tracking. Most people need adjustments after 2–4 weeks. That is normal. Sustainable progress &gt; starving yourself.</p>

          <h4>What This Means For You</h4>
          <p>If you consistently stay within this calorie range, train properly and don't sabotage yourself on weekends, you should expect gradual, sustainable fat loss. If you're not seeing change, the problem usually isn't the calculation — it's habits, accuracy and structure.</p>
        </div>

        <DynamicCTA goal={results.goal} />
      </div>
    )
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <div className="icon-circle">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
          </svg>
        </div>
        <h1>Invictus TDEE Calculator</h1>
        <p className="subtitle">Discover your daily calorie needs and personalized fat loss targets</p>
      </div>

      <div className="form-container">
        <div className="form-grid">
          <div className="form-field">
            <label>Age</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="Enter your age"
            />
          </div>

          <div className="form-field">
            <label>Gender</label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="form-field">
            <label>Weight (kg)</label>
            <input
              type="number"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              placeholder="Your weight"
            />
          </div>

          <div className="form-field">
            <label>Height (cm)</label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => setFormData({...formData, height: e.target.value})}
              placeholder="Your height"
            />
          </div>
        </div>

        <div className="form-field">
          <label>Activity Level</label>
          <select
            value={formData.activity}
            onChange={(e) => setFormData({...formData, activity: e.target.value})}
          >
            {activityOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label>Your Goal</label>
          <select
            value={formData.goal}
            onChange={(e) => setFormData({...formData, goal: e.target.value})}
          >
            <option value="lose">Lose Fat</option>
            <option value="maintain">Maintain Weight</option>
            <option value="gain">Gain Muscle</option>
          </select>
        </div>

        <div className="warning-box">
          <p className="warning-title">⚠️ Important to Know</p>
          <p className="warning-text">
            This calculator provides <strong>estimates</strong> based on proven formulas, but everyone's metabolism is unique. Use these numbers as your starting point, then adjust based on your real-world results over 2-3 weeks.
          </p>
        </div>

        <button onClick={calculateTDEE} className="calculate-btn">
          Calculate My Numbers
        </button>
      </div>
    </div>
  )
}
