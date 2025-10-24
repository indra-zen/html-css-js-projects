import { teamMembers } from "./teamMembers.js";

const teamGrid = document.getElementById("teamGrid");

teamMembers.forEach((member) => {
  const socialLinks = member.socials
    .map((social) => `<a href="${social.url}" class="social-icon"><i class="${social.icon}"></i></a>`)
    .join("");

  const card = `
    <section class="team-card">
      <section class="card-top">
        <section class="profile-bg"></section>
        <section class="profile-img">
          <img src="${member.image}" alt="Team Member" />
        </section>
        <h3>${member.name}</h3>
        <p class="role">${member.role}</p>
      </section>
      <section class="card-bottom">
        <p class="bio">${member.bio}</p>
        <section class="social-links">${socialLinks}</section>
      </section>
    </section>
  `;

  teamGrid.innerHTML += card;
});
