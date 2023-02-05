const link = "https://v688g1-8901.preview.csb.app/api/features";
const $jsContent = document.querySelector(".js_content");

// 
// http://localhost:8901/api/features
// https://first-azure-project.azurewebsites.net

fetch(link)
  .then((data) => data.json())
  .then((features) => {
    $jsContent.innerHTML = ``;
    features.map(
      ({ id, feature, version, year }) =>
        ($jsContent.innerHTML += `
        <li class="feature">${id}
          <ul>
            <li>${feature}</li>
            <li>${version}</li>
            <li>${year}</li>
          </ul>
        </li>`)
    );
  });

