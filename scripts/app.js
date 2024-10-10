const loadAllPhones = async (status, brandName) => {
  document.getElementById("spinner").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      brandName ? brandName : "iphone"
    }`
  );
  const data = await response.json();

  if (status) {
    displayAllPhones(data.data);
  } else {
    displayAllPhones(data.data.slice(0, 6));
  }
};

const displayAllPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
          <div class="border rounded-lg flex justify-center items-center">
            <div class="p-6">
              <!-- image container -->
              <div class="w-[314px] rounded-lg px-20 py-10">
                <img src="${phone.image}" alt="" />
              </div>

              <!-- text container -->
              <div class="px-9">
                <h4 class="text-2xl font-bold mt-6 mb-5">${phone.phone_name}</h4>
                <p class="text-lg font-normal text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Doloribus, ullam!
                </p>
                <h5 class="text-2xl font-bold mt-2 mb-4">$<span>999</span></h5>
                <button
                  onclick="phoneDetails('${phone.slug}')"
                  class="btn bg-[#0D6EFD] text-xl font-bold font-poppins text-white"
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
    `;

    phonesContainer.append(div);
  });
};

const handleShowAll = () => {
  loadAllPhones(true);
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";

  const searchText = document.getElementById("search-box").value;

  setTimeout(() => {
    loadAllPhones(false, searchText);
  }, 2000);
};

const phoneDetails = async (slug) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await response.json();
  console.log(data);
};

loadAllPhones();
