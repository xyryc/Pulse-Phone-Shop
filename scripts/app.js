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
  console.log(data.data.mainFeatures.storage);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
          <dialog id="detailsModal" class="modal">
            <div class="modal-box text-left w-11/12 max-w-5xl">
              <img class="mx-auto mb-11 md:mb-20" src='${data.data.image}'> 
              <h3 class="text-3xl font-bold">${data.data.name}</h3>
              <p class='mt-6 mb-5'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </p>
              <p class="text-xl font-semibold">Storage: <span class="text-lg font-normal text-[#706F6F]">${data.data.mainFeatures.storage}</span>
              <p class="text-xl font-semibold">Display Size: <span class="text-lg font-normal text-[#706F6F]">${data.data.mainFeatures.displaySize}</span>
              <p class="text-xl font-semibold">Chipset: <span class="text-lg font-normal text-[#706F6F]">${data.data.mainFeatures.chipset}</span>
              <p class="text-xl font-semibold">Memory: <span class="text-lg font-normal text-[#706F6F]">${data.data.mainFeatures.memory}</span>
              <p class="text-xl font-semibold">Slug: <span class="text-lg font-normal text-[#706F6F]">${data.data.slug}</span>
              <p class="text-xl font-semibold">Release Date: <span class="text-lg font-normal text-[#706F6F]">${data.data.releaseDate}</span>
              <p class="text-xl font-semibold">Brand: <span class="text-lg font-normal text-[#706F6F]">${data.data.brand}</span>
              <p class="text-xl font-semibold">GPS: <span class="text-lg font-normal text-[#706F6F]">${data.data.others.GPS}</span>
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
  `;

  detailsModal.showModal();
};

loadAllPhones();
