// PAYMENT
async function payNow(place, amount) {
  let token = localStorage.getItem("token");
  if (!token) {
    alert("Login first!");
    return window.location = "login.html";
  }

  let orderRes = await fetch("https://tour-3owe.onrender.com/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount })
  });

  let order = await orderRes.json();

  let options = {
    key: "rzp_test_Ri3Gjv1gShtqpu",
    amount: order.amount,
    currency: "INR",
    order_id: order.id,

    handler: async function (response) {
      await fetch("https://tour-3owe.onrender.com/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: place,
          amount: amount,
          paymentId: response.razorpay_payment_id
        })
      });

      alert("Booking successful!");
    }
  };

  let rzp = new Razorpay(options);
  rzp.open();
}

// FEEDBACK
document.getElementById("feedbackForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("https://tour-3owe.onrender.com/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        message: msg.value
      })
    });

    alert("Thanks for your feedback!");
  });
