const searchForm = document.querySelector("#searchForm");
const resultBox = document.querySelector("#resultBox");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = document.querySelector("#searchInput").value;

  console.log(query);
  await fetch(`http://localhost:3000/data/?clientId=${query}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.success) {
        showResult(data);
      } else {
        noResult();
      }
    })
    .catch((e) => console.log(e));
});

const showResult = (data) => {
  console.log(data);
  resultBox.innerHTML = `
  <div id="resultBox1">

  <h5 class="h55">Client ID:</h5>
  <h4 class="h44">${data.user.clientId.toUpperCase()}</h4>
  <h5 class="h55">Name:</h5>
  <h4 class="h44">${data.user.firstName} ${data.user.lastName}</h4>

  <h5 class="h55">Date of Birth:</h5>
  <h4 class="h44">${data.user.dob}</h4>
  <h5 class="h55">Status:</h5>
  <h4 class="h44">${data.user.status ? "ACTIVE" : "CANCELLED"}</h4>
</div>
<div class="spacer"></div>
<div>
  <!-- statement of responsibility -->
  <p class="pp">
    IAC Future Private Limited acknowledges that our client- <strong> ${
      data.user.firstName
    } ${data.user.lastName} </strong>
    has been provided with all conditional bookings for the tour to
    Australia considering Australia Immigration guidelines for not
    purchasing any actual hotel, event, and airline tickets till a
    visa is granted.
  </p>
  <p class="pp">
    <strong>IAC Future ensures the availability of travel plan, Airline
    tickets (both international and domestic) and Hotel bookings.
    </strong>
  </p>
</div>
  `;
  data = "";
};

const noResult = () => {
  resultBox.innerHTML = `
    <div id="resultBox1">

    <h3>User Not Found</h3>
    <p> Plese Check the User Id entered ...</p>
  </div>
  <div class="spacer"></div>
    `;
};
