const salad = {
    productName: "Fresh Garden Salad",
    batchId: "FT-2709-001",
    producedAt: "27 September 2026 • 08:30",
    ingredients: [
        "cabbage",
        "carrot",
        "lettuce"
    ]
};

const ingredients = {
    cabbage: {
        name: "Cabbage",
        farmer: "Kelompok Tani Sumber Rejeki",
        location: "Batu, Jawa Timur",
        harvest: "24 September 2026",
        batch: "KB-2409-A",
        price: "Rp4.800/kg"
    },

    carrot: {
        name: "Carrot",
        farmer: "Kelompok Tani Makmur",
        location: "Poncokusumo, Malang",
        harvest: "24 September 2026",
        batch: "WT-2409-B",
        price: "Rp7.200/kg"
    },

    lettuce: {
        name: "Lettuce",
        farmer: "Mitra Tani Sejuk",
        location: "Junrejo, Batu",
        harvest: "25 September 2026",
        batch: "SL-2409-C",
        price: "Rp9.500/kg"
    },
    melon: {
        name: "Melon",
        farmer: "Kelompok Tani Mulyo",
        location: "Kediri, Jawa Timur",
        harvest: "24 September 2026",
        batch: "ML-2409-D",
        price: "Rp8.000/kg"
    }
};

function showIngredient(id) {
    const data = ingredients[id];
    const popup =
        document.getElementById("popup");
    const popupDetail =
        document.getElementById("popup-detail");
    popupDetail.innerHTML = `
        <p class="eyebrow">
            INGREDIENT TRACEABILITY
        </p>
        <h2>
            🥬 ${data.name}
        </h2>
        <div class="popup-info">
            <span>
                👩‍🌾 FARMER
            </span>
            <strong>
                ${data.farmer}
            </strong>
        </div>
        <div class="popup-info">
            <span>
                📍 ORIGIN
            </span>
            <strong>
                ${data.location}
            </strong>
        </div>
        <div class="popup-info">
            <span>
                🌱 HARVEST
            </span>
            <strong>
                ${data.harvest}
            </strong>
        </div>
        <button
            class="journey-button"
            onclick="showJourney('${id}')"
        >
            TRACE MY INGREDIENT →
        </button>
    `;
    popup.style.display = "flex";
}
function closePopup() {
    const popup =
        document.getElementById("popup");
    popup.style.display = "none";
}

function showJourney(id) {
    const data = ingredients[id];
    const popupDetail =
        document.getElementById("popup-detail");
    popupDetail.innerHTML = `
        <p class="eyebrow">
            TRACEABILITY JOURNEY
        </p>
        <h2>
            ${data.name}'s Journey
        </h2>
        <div class="journey">
            <div class="journey-step">
                <div class="journey-icon">
                    🌱
                </div>
                <div>
                    <small>
                        FARM
                    </small>
                    <h3>
                        ${data.location}
                    </h3>
                    <p>
                        Partner farmer
                    </p>
                </div>
            </div>
            <div class="journey-line"></div>
            <div class="journey-step">
                <div class="journey-icon">
                    🌾
                </div>
                <div>
                    <small>
                        HARVEST
                    </small>
                    <h3>
                        ${data.harvest}
                    </h3>
                    <p>
                        Freshly harvested
                    </p>
                </div>
            </div>
            <div class="journey-line"></div>
            <div class="journey-step">
                <div class="journey-icon">
                    📦
                </div>
                <div>
                    <small>
                        COLLECTION
                    </small>
                    <h3>
                        Batch ${data.batch}
                    </h3>
                    <p>
                        Quality checked
                    </p>
                </div>
            </div>
            <div class="journey-line"></div>
            <div class="journey-step">
                <div class="journey-icon">
                    🚚
                </div>
                <div>
                    <small>
                        DELIVERY
                    </small>
                    <h3>
                        Fresh delivery
                    </h3>
                    <p>
                        Cold-chain maintained
                    </p>
                </div>
            </div>
            <div class="journey-line"></div>
            <div class="journey-step">
                <div class="journey-icon">
                    🥗
                </div>
                <div>
                    <small>
                        YOUR SALAD
                    </small>
                    <h3>
                        FRESHTRACE
                    </h3>
                    <p>
                        Ready to enjoy
                    </p>
                </div>
            </div>
        </div>
        <button
            class="journey-button"
            onclick="showMap('${id}')"
        >
            VIEW FARM MAP →
        </button>
    `;
}

function showMap(id) {
    const data = ingredients[id];
    const popupDetail =
        document.getElementById("popup-detail");
    popupDetail.innerHTML = `
        <p class="eyebrow">
            FARM LOCATION
        </p>
        <h2>
            📍 ${data.location}
        </h2>
        <div class="farm-map">
            <div class="map-background">
                <div class="map-road road-1"></div>
                <div class="map-road road-2"></div>
                <div class="map-road road-3"></div>
                <div class="map-pin">
                    📍
                    <span>
                        FARM
                    </span>
                </div>
                <div class="map-label">
                    ${data.location}
                </div>
            </div>
            <p class="map-caption">
                📍 Farm origin
                <br>
                Batch ${data.batch}
            </p>
        </div>
        <button
            class="journey-button"
            onclick="showIngredient('${id}')"
        >
            ← BACK TO INGREDIENT
        </button>
    `;
}
function updateFreshness() {
    const produced =
        new Date("2026-09-27T08:30:00");
    const expiry =
        new Date("2026-09-28T08:30:00");
    const now =
        new Date();
    const totalTime =
        expiry - produced;
    const remainingTime =
        expiry - now;
    let percentage =
        (remainingTime / totalTime) * 100;
    percentage =
        Math.max(
            0,
            Math.min(100, percentage)
        );
    const percent =
        Math.round(percentage);
    const status =
        document.getElementById(
            "fresh-status"
        );
    const percentText =
        document.getElementById(
            "fresh-percent"
        );
    const progress =
        document.getElementById(
            "fresh-progress"
        );
    percentText.textContent =
        percent + "%";
    progress.style.width =
        percent + "%";
    if (percent > 50) {
        status.textContent =
            "FRESH";
    } else if (percent > 20) {
        status.textContent =
            "CONSUME SOON";
    } else if (percent > 0) {
        status.textContent =
            "EXPIRING SOON";
    } else {
        status.textContent =
            "EXPIRED";
    }
}
updateFreshness();
function updateProductPassport() {

    document.getElementById("passport-product")
        .textContent = salad.productName;


    document.getElementById("passport-batch")
        .textContent = salad.batchId;


    document.getElementById("passport-produced")
        .textContent = salad.producedAt;
}
updateProductPassport();