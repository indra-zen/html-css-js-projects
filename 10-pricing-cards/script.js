import { pricingData } from "./pricing.js";

const container = document.getElementById("pricing-cards");

pricingData.forEach((plan) => {
  const card = document.createElement("div");
  card.className = `card${plan.popular ? " popular" : ""}`;

  const featuresHTML = plan.features
    .map((feature) => `
      <li${!feature.enabled ? ' class="disabled"' : ""}>
        <i class="fas fa-${feature.enabled ? "check" : "times"}"></i> ${feature.text}
      </li>
    `)
    .join("");

  card.innerHTML = `
    ${plan.popular ? '<div class="popular-badge">Most Popular</div>' : ""}
      <div class="card-header">
        <div class="plan-icon">
          <i class="fas ${plan.icon}"></i>
        </div>
        <h3>${plan.name}</h3>
        <div class="price">
          <span class="currency">$</span>
          <span class="amount">${plan.price}</span>
          <span class="period">/month</span>
        </div>
        <p class="description">${plan.description}</p>
      </div>
      <div class="card-body">
        <ul class="features">${featuresHTML}</ul>
      </div>
      <div class="card-footer">
        <button class="btn${plan.popular ? " btn-accent" : ""}">Get Started</button>
      </div>
    `;

  container.appendChild(card);
});
