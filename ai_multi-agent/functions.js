const functions = require("firebase-functions");

exports.onProductCreate = functions.firestore.document("products/{productId}").onCreate((snap, context) => {
  const productId = context.params.productId;
  console.log("New product created with ID:", productId);
  return null;
});

exports.checkHourlyTransactions = functions.pubsub
  .schedule("0 * * * *")
  .onRun((context) => {
    const now = new Date();
    console.log(
      "checkHourlyTransactions triggered at:",
      now.toISOString()
    );
    return null;
  });
