let currentPage = 1;
const totalPages = 3;

document.getElementById("previous-btn").addEventListener("click", () => {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
});

function showPage(page) {
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById(`page-${i}`).classList.remove("page-active");
    }
    document.getElementById(`page-${page}`).classList.add("page-active");
    currentPage = page;

    // Update button visibility
    document.getElementById("previous-btn").style.display =
        currentPage === 1 ? "none" : "inline-block";
    document.getElementById("next-btn").style.display =
        currentPage === totalPages ? "none" : "inline-block";
    document.getElementById("submit-btn").style.display =
        currentPage === totalPages ? "inline-block" : "none";
}

// Initialize
showPage(currentPage);
